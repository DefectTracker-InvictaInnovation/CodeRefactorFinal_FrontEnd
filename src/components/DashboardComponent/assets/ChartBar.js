import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'antd';
import axios from 'axios';
import {API_BASE_URL} from '../../../constants/index';

export default class ChartBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            highsev:'',
            mediumsev:'',
            lowsev:'',
            count:'',
          
        }
        // this.componentWillMount = this.componentWillMount.bind(this);
      };

      
      getdefectcount(){

        axios
        .get(API_BASE_URL+'/gettoatalcount')
        .then(res=>{
            console.log(res.data)
            this.setState({
                count:res.data
            })
        })
}
getHigh(){


        axios
        .get(API_BASE_URL+'/getseverityhigcount')
        .then(res=>{
            console.log(res.data)
            this.setState({
                highsev:res.data
            })
        })
}

getMedium(){
    axios
    .get(API_BASE_URL+'/getseveritymediumcount')
    .then(res=>{
        console.log(res.data)
        this.setState({
            mediumsev:res.data
        })
    })
}



getlow() {
    const url =API_BASE_URL+ '/getseveritylowcount';
    axios.get(url)

      .then(response => this.setState({
        lowsev: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      }); } 



componentDidMount(){
    this.getHigh()
    this.getMedium()
    this.getlow()
    this.getdefectcount()
}


    render() {
console.log()

        /*const multiAxisData = {
            labels: ['High', 'Medium', 'Low '],
            datasets: [{
                label: 'Severity',
                backgroundColor: [
                    '#EC407A',
                    '#AB47BC',
                    '#42A5F5',
                    

                ],
                yAxisID: 'y-axis-1',
                data: [this.state.highsev, this.state.mediumsev, this.state.lowsev]
            }]
        };*/
        const multiAxisData = {
            labels: ['High', 'Medium', 'Low '],
            datasets: [{
                label: 'Defects',
                backgroundColor: [
                    '#EC407A',
                    '#AB47BC',
                    '#42A5F5'
                

                ],
                yAxisID: 'y-axis-1',
               data:[this.state.highsev,this.state.mediumsev,this.state.lowsev]
             

                
            }]
        };

        const multiAxisOptions = {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        min: 0,
                        max:100
                    }
                }]
            }
        }



        return (
            <div>
                <Card title="Defects By Projects" style={{ borderRadius: "5px", margin: "0 0 0 7px" }}>
              



                    <Chart type="bar" data={multiAxisData} options={multiAxisOptions} style={{ padding: "0 0 60px 0", }} />

                </Card>
                

                
                

               

            </div>
        )
    }
}
