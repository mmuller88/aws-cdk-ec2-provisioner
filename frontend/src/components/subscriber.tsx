import React from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { Observable } from 'zen-observable-ts';

type ConfigType<VariableType extends {}> = {
  query: string;
  key: string;
  variables?: VariableType;
};

export const useSubscription = <
  ItemType extends { id: string },
  VariablesType extends {} = {}
>({
  config,
  itemData,
}: {
  config?: ConfigType<VariablesType>;
  itemData?: ItemType;
} = {}) => {
  const [item, update] = React.useState<ItemType | undefined>(itemData);

  React.useEffect(() => {
    let unsubscribe;
    if (config) {
      const { query, key, variables } = config;
      const subscription = API.graphql(graphqlOperation(query, variables));
      if (subscription instanceof Observable) {
        const sub = subscription.subscribe({
          next: payload => {
            try {
              const {
                value: {
                  data: { [key]: item },
                },
              }: {
                value: { data: { [key: string]: ItemType } };
              } = payload;

              update(item);
            } catch (error) {
              console.error(
                `${error.message} - Check the key property: the current value is ${key}`
              );
            }
          },
        });
        unsubscribe = () => {
          sub.unsubscribe();
        };
      }
    }
    return unsubscribe;
  }, [JSON.stringify(config)]);

  return [item];
};