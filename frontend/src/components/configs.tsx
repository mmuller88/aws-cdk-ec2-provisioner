import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Auth } from '@aws-amplify/auth';

import { useListEc2ConfigsQuery } from '../lib/api';
import { CreateEc2ConfigInput, CreateEc2ConfigDocument, Ec2Config } from '../lib/api';
import { API } from '../lib/fetcher';

import DateTimePicker from 'react-datetime-picker';

const initialState = { startDate: '', stopDate: ''};

export function Configs() {
  const [config, setConfig] = useState(initialState);
  const { startDate, stopDate} = config;

  const { data, isLoading, refetch } = useListEc2ConfigsQuery(null, {
    refetchOnWindowFocus: false
  });

  // useCreatePostMutation isn't working correctly right now
  const [createEc2Config] = useMutation(async (input: CreateEc2ConfigInput) => {
    const result = await API.getInstance().query(CreateEc2ConfigDocument, { input });
    return result.data?.createEc2Config as Ec2Config;
  });

  // const onChange = (e) => {
  //   setConfig(() => ({ ...config, [e.target.name]: e.target.value }))
  // }

  const onChangeStartDate = (date: Date) => {
    console.log(date);
    setConfig(() => ({ ...config, startDate: date.toISOString() }))
  }

  const onChangeStopDate = (date: Date) => {
    console.log(date);
    setConfig(() => ({ ...config, stopDate: date.toISOString() }))
  }

  const createNewEc2Config = async () => {
    if (!startDate || !stopDate) return

    const userData = await Auth.currentAuthenticatedUser();

    const input = {
      ...config,
      // startDate: startDate2.toISOString(),
      username: userData.username
    };

    const createResult = await createEc2Config(input, { onSuccess: (data) => { console.log(data) } });
    if (createResult) {
      refetch();
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2>Ec2 Configs:</h2>
        {
          data?.listEc2Configs?.items
            ? data?.listEc2Configs?.items?.map(config => {
              return (
                <div>
                  <h4>Start Date: {new Date(config.startDate).toLocaleString()}</h4>
                  <h4>Stop Date: {new Date(config.stopDate).toLocaleString()}</h4>
                  <h4>Owner: {config.owner}</h4>
                </div>
              )
            })
            : <h4>No ec2 configs found</h4>
        }
      </div>
      <br />
      <br />
      <div>
        <h3>Create Ec2 Config:</h3>
        <div>
          <DateTimePicker
            onChange={onChangeStartDate}
            value={new Date()}
          />
        </div>
        <div>
          <DateTimePicker
            onChange={onChangeStopDate}
            value={new Date()}
          />
        </div>
        <div> 
          <button onClick={createNewEc2Config}>Create Ec2 Config</button>
        </div>
      </div>
    </div>
  );
}