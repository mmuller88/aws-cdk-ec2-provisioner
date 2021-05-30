import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '../App';

export interface RouteParams {
  id: string;
}
export function Vms({ match }: RouteComponentProps<RouteParams>) {

  // let { data, isLoading, refetch } = useListEc2Query(null, {
  //   refetchOnWindowFocus: false
  // });


  const id = match.params.id;
  // let filteredData = data;
  // if(id && data){
  //   // console.log('id:'+id);
  //   data.listEc2 = data?.listEc2?.filter(e => e.id === id);
  // }

  // if (isLoading) return <div>Loading...</div>;

  return (
    <AppContext.Consumer>
      {
        ({ec2List, configResult}) => 
    <div>
      <div>
        <h2>VMs:</h2>
        {
          ec2List?.listEc2
            ? ec2List?.listEc2?.filter(e => !id || (id && e.id === id)).map(ec2 => {
              return (
                <div>
                  <h5>Id: <a href={"#/vms/"+ec2.id}>{ec2.id}</a></h5>
                  <h5>VmType: {ec2.vmType}</h5>
                  <h4>UserId: {ec2.userId}</h4>
                  <h5>Instance name: {ec2.name}</h5>
                  <h5>State: {ec2.state}</h5>
                  <h5>PublicDnsName: {ec2.publicDnsName}</h5>
                  <h5>PublicKey: {ec2.publicKey}</h5>
                  <h5>Associated Config: {configResult?.data.listEc2Configs.items.filter(c => c.userId === ec2.userId && c.vmType === ec2.vmType).map(c => <a href={"#/configs/"+c.id}>{c.id}</a>)}</h5>
                </div>
              )
            })
            : <h4>No vms found</h4>
        }
      </div>
      <br />
      <br />
    </div>
     }
     </AppContext.Consumer>
  );
}