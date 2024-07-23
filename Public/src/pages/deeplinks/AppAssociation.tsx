import { useEffect, useState } from 'react';

function AppAssociation() {

    const [appAssociationFile, setAppAssociationFile] = useState<any>();

    useEffect(() => {

        const getData = () => {
            fetch('https://www.dofy.in/.well-known/apple-app-site-association',
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            ).then((response) => {
                return response.json();
            }).then((myJson) => {
                setAppAssociationFile(myJson);
            });
        }

        getData();

    }, []);

    return (<div><pre>{JSON.stringify(appAssociationFile, null, 6)}</pre></div>)
}

export default AppAssociation