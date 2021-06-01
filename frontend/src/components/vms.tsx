import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '../App';
import { State } from '../lib/api';

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

  const downloadPemFile = (privateKey: string) => {
    const element = document.createElement("a");
    const file = new Blob([privateKey], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "vm.pem";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

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
                  <h4>Id: <a href={"#/vms/"+ec2.id}>{ec2.id}</a></h4>
                  <h5>UserId: {ec2.userId}</h5>
                  <h5>VmType: {ec2.vmType}</h5>
                  <h5>VM name: {ec2.name}</h5>
                  <h5>State: {ec2.state}</h5>
                    {
                      ec2.state === State.Running ?  
                        <div>
                          <h5>PublicDnsName: <a href={'http://'+ec2.publicDnsName} target="_blank" rel="noreferrer">{ec2.publicDnsName}</a></h5>
                          <h5>PrivateKey: <button onClick={()=>downloadPemFile(ec2.privateKey)}>vm.pem</button></h5>
                          <h6>1) download vm.pem</h6>
                          <h6>2) chmod 0400 vm.pem</h6>
                          <h6>3) ssh -i "vm.pem" ec2-user@{ec2.publicDnsName}</h6>
                        </div>
                      : 'VM not in RUNNING state so no connection possible!'
                    }
                  <h5>Associated Config: {configResult?.data.listEc2Configs.items.filter(c => c.userId === ec2.userId && c.vmType === ec2.vmType).map(c => <a href={"#/configs/"+c.id}>{c.id}</a>)}</h5>
                  <br/>
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