import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Auth } from '@aws-amplify/auth';

import { DeleteEc2ConfigDocument, DeleteEc2ConfigInput, useListEc2ConfigsQuery } from '../lib/api';
import { CreateEc2ConfigInput, CreateEc2ConfigDocument, Ec2Config } from '../lib/api';
import { API } from '../lib/fetcher';

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

import { Moment } from "moment";
import * as moment from "moment";

const initialState = { startDate: '', stopDate: '', vmType: -1, userId: 'noUserId'};

export function Configs() {
  const [config, setConfig] = useState(initialState);
  const { startDate, stopDate, vmType, userId} = config;

  const { data, isLoading, refetch } = useListEc2ConfigsQuery(null, {
    refetchOnWindowFocus: false
  });

  // useCreatePostMutation isn't working correctly right now
  const [createEc2Config] = useMutation(async (input: CreateEc2ConfigInput) => {
    const result = await API.getInstance().query(CreateEc2ConfigDocument, { input });
    return result.data?.createEc2Config as Ec2Config;
  });

  const [deleteEc2Config] = useMutation(async (input: DeleteEc2ConfigInput) => {
    const result = await API.getInstance().query(DeleteEc2ConfigDocument, { input });
    console.log(result);
    return result.data?.deleteEc2Config as Ec2Config;
  });

  const createNewEc2Config = async () => {
    if (!startDate || !stopDate || !userId || vmType < 1) return;
    if (data.listEc2Configs.items.length > 5) return;

    console.log(config);

    //const userData = await Auth.currentAuthenticatedUser();

    const input = {
      ...config,
      // startDate: startDate2.toISOString(),
      //userId: userData.userId,
    };

    const createResult = await createEc2Config(input, { onSuccess: (data) => { console.log(data) } });
    if (createResult) {
      refetch();
    }
  }

  const onChange = (e) => {
    setConfig(() => ({ ...config, [e.target.name]: e.target.value }))
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
                  <h5>UserId: {config.userId}</h5>
                  <h4>VmType: {config.vmType}</h4>
                  <h4>Start Date: {new Date(config.startDate).toLocaleString()}</h4>
                  <h4>Stop Date: {new Date(config.stopDate).toLocaleString()}</h4>
                  <button onClick={async () => {
                    const deleteResult = await deleteEc2Config({id: config.id});
                    if (deleteResult) {
                      refetch();
                    }
                  }}>Delete</button>
                </div>
              )
            })
            : <h4>No ec2 configs found</h4>
        }
      </div>
      <br />
      <br />
      <h3>Create Ec2 Config:</h3>
      <div>
        <div>
          UserId:
          <input onChange={onChange} name="userId" placeholder="martin" />
        </div>
        <div>
          VmType:
          <input onChange={onChange} name="vmType" placeholder="1" />
        </div>
        <div>
          StartDate:
          <Datetime
            onChange={ (date: string | Moment) => setConfig(() => ({ ...config, startDate: (date as Moment).toISOString() }))}
            // value={new Date(new Date().setHours(new Date().getHours() + 1))}
          />
        </div>
        <div>
          StopDate:
          <Datetime
            onChange={ (date: string | Moment) => setConfig(() => ({ ...config, stopDate: (date as Moment).toISOString() }))}
            // value={new Date(new Date().setHours(new Date().getHours() + 1))}
          />
        </div>
        <div> 
          <button onClick={createNewEc2Config}>Create Ec2 Config</button>
        </div>
      </div>
    </div>
  );
}