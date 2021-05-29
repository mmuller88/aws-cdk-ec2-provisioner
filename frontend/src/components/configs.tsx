import React, { useState } from 'react';
import { QueryResult, useMutation } from 'react-query';
import { Auth } from '@aws-amplify/auth';

import { DeleteEc2ConfigDocument, DeleteEc2ConfigInput, ListEc2ConfigsQuery } from '../lib/api';
import { CreateEc2ConfigInput, CreateEc2ConfigDocument, Ec2Config } from '../lib/api';
import { API } from '../lib/fetcher';

import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

import { Moment } from "moment";
import { AppContext } from '../App';
import { RouteComponentProps } from 'react-router-dom';

const initialState = { startDate: '', stopDate: '', vmType: -1, userId: 'noUserId'};

export interface RouteParams {
  id: string;
}
export function Configs({ match }: RouteComponentProps<RouteParams>) {
  const [config, setConfig] = useState(initialState);
  const { startDate, stopDate, vmType, userId} = config;

  // const { data, isLoading, refetch } = useListEc2ConfigsQuery(null, {
  //   refetchOnWindowFocus: false
  // });

  // const ec2Data = useListEc2Query(null, {
  //   refetchOnWindowFocus: false
  // }).data;

  const id = match.params.id;

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

  const createNewEc2Config = async (configResult: QueryResult<ListEc2ConfigsQuery, any>) => {
    if (!startDate || !stopDate || !userId || vmType < 1) return;
    if (configResult.data.listEc2Configs.items.length > 5) return;

    console.log(config);

    //const userData = await Auth.currentAuthenticatedUser();

    const input = {
      ...config,
      // startDate: startDate2.toISOString(),
      //userId: userData.userId,
    };

    const createResult = await createEc2Config(input, { onSuccess: (data) => { console.log(data) } });
    if (createResult) {
      configResult.data = await configResult.refetch();
    }
  }

  const onChange = (e: any) => {
    setConfig(() => ({ ...config, [e.target.name]: e.target.value }))
  }

  // if (isLoading) return <div>Loading...</div>;

  return (
    <AppContext.Consumer>
      {
        ({ec2List, configResult}) => 
          <div>
            <div>
              <h2>VM Configs:</h2>
              {
                configResult.data?.listEc2Configs?.items
                  ? configResult.data?.listEc2Configs?.items?.filter(c => !id || (id && c.id === id)).sort((c1, c2) => Number(c1.createdAt)-Number(c2.createdAt)).map(config => {
                    return (
                      <div>
                        <h5>Id: {config.id}</h5>
                        <h4>UserId: {config.userId}</h4>
                        <h4>VmType: {config.vmType}</h4>
                        <h4>Start Date: {new Date(config.startDate).toLocaleString()}</h4>
                        <h4>Stop Date: {new Date(config.stopDate).toLocaleString()}</h4>
                        <h4>Associated vms: {ec2List?.listEc2.filter(e => e.userId === config.userId && e.vmType === config.vmType).map(e => <a href={"#/vms/"+e.id}>{e.id}</a>)}</h4>
                        <button onClick={async () => {
                          const deleteResult = await deleteEc2Config({id: config.id});
                          if (deleteResult) {
                            configResult.refetch();
                          }
                        }}>Delete</button>
                      </div>
                    )
                  })
                  : <h4>No vm configs found</h4>
              }
            </div>
            <br />
            <br />
            <h3>Create VM Config:</h3>
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
                <button onClick={() => createNewEc2Config(configResult)}>Create VM Config</button>
              </div>
            </div>
          </div>
  }
    </AppContext.Consumer>
  );
}