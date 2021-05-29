import React from 'react';
import { QueryResult } from 'react-query';
import { ListEc2Query, ListEc2ConfigsQuery } from '../lib/api';

type ContextProps = {
    ec2List: ListEc2Query,
    configResult: QueryResult<ListEc2ConfigsQuery, any>
};

export const AppContext = React.createContext<Partial<ContextProps>>({});