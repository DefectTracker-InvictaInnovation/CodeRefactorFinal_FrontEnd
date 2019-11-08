import React from 'react';
import {Link} from "react-router-dom";

import {
    PageHeader
} from 'antd';
import { Button } from 'antd/lib/radio';


class Configure extends React.Component {

  
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount(){
    }

    render() {
        
        const routes = [{
                path: 'index',
                breadcrumbName: 'Home',
            },
            {
                path: 'first',
                breadcrumbName: 'Configure',
            },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Configure" breadcrumb={{ routes }} />
                <div
                    style={{
                    padding: '0 24px 24px 24px',
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
                    <Link to = "/PriorityConfig">
                    <Button>Priority Configure</Button>
                    </Link>
                    <Link to = "/SeverityConfig">
                    <Button>Severity Configure</Button>
                    </Link>
                    <Link to = "/StatusConfig">
                    <Button>Status Configure</Button>
                    </Link>
                    <Link to = "/TypeConfig">
                    <Button>Type Configure</Button>
                    </Link>
            
                </div>
                
            </React.Fragment>
            

        );
    }
}


export default Configure;
