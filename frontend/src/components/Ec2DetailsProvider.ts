import React from 'react';
import { ListEc2Query } from '../lib/api';

type ContextProps = {
    ec2List: ListEc2Query,
};

export const AppContext = React.createContext<Partial<ContextProps>>({});