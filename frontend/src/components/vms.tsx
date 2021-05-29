import { debug } from 'console';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { useListEc2Query } from '../lib/api';

export interface RouteParams {
  id: string;
}
export function Vms({ match }: RouteComponentProps<RouteParams>) {

  let { data, isLoading, refetch } = useListEc2Query(null, {
    refetchOnWindowFocus: false
  });


  const id = match.params.id;
  // let filteredData = data;
  if(id && data){
    // console.log('id:'+id);
    data.listEc2 = data?.listEc2?.filter(e => e.id === id);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2>VMs:</h2>
        {
          data?.listEc2
            ? data?.listEc2.map(ec2 => {
              return (
                <div>
                  <h4>UserId: {ec2.userId}</h4>
                  <h5>Id: <a href={"vms/"+ec2.id}>{ec2.id}</a></h5>
                  <h5>Name: {ec2.name}</h5>
                  <h5>VmType: {ec2.vmType}</h5>
                  <h5>State: {ec2.state}</h5>
                </div>
              )
            })
            : <h4>No vms found</h4>
        }
      </div>
      <br />
      <br />
    </div>
  );
}