import {Page, Grid, Card, Text, Button, Banner, ProgressBar, Icon} from '@shopify/polaris';
import {useEffect, useState,useCallback} from 'react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import vedio from '../components/imges/image_one.png';
import { CircleTickMajor } from '@shopify/polaris-icons';


// chart imports start
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import { faker } from '@faker-js/faker';

  ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Filler,
      Legend
    );

    export const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: '',
        },
      },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    export const data = {
      labels,
      datasets: [
        {
          fill: true,
          label: 'Dataset 2',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          borderColor: 'rgba(79, 209, 197, 1)',
          backgroundColor: 'rgba(79, 209, 197, 0.54)',
        },

      ],
    };
  // chart imports end

function Dashboard() {

    const navigate = useNavigate();

    return (
        <Page  >
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h1 className="Polaris-Header-Title" style={{paddingBottom:"20px",paddingTop:"10px"}}>Dashboard</h1>
        <Button primary onClick={()=>navigate('/new-campaign')}>New Campaign +</Button>
      </div>
      <Grid>
        <Grid.Cell columnSpan={{xs: 4, sm: 3, md: 3, lg: 4, xl: 4}}>
          <Card title="Total Campaigns" sectioned>
            <Text variant="heading3xl" as="h2">22</Text>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 4, sm: 3, md: 3, lg: 4, xl: 4}}>
            <Card title="Mystery discounts consumed" sectioned>
            <Text variant="heading3xl" as="h2">10</Text>
          </Card>
        </Grid.Cell>

      <Grid.Cell columnSpan={{xs: 4, sm: 3, md: 3, lg: 4, xl: 4}}>
          <Card title="Total orders (via app)" sectioned>
            <Text variant="heading3xl" as="h2">8</Text>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 4, sm: 3, md: 3, lg: 4, xl: 4}}>
            <Card title="Campaigns by Product" sectioned>
            <Text variant="heading3xl" as="h2">8</Text>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 4, sm: 3, md: 3, lg: 4, xl: 4}}>
            <Card title="Campaigns by Collection" sectioned>
            <Text variant="heading3xl" as="h2">7</Text>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 4, sm: 3, md: 3, lg: 4, xl: 4}}>
            <Card title="Campaigns by Whole Store" sectioned>
            <Text variant="heading3xl" as="h2">5</Text>
          </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 12, xl: 12}}>
            <Card sectioned>
                <Line options={options} data={data} />
            </Card>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 8, sm: 3, md: 3, lg: 8, xl: 8}}>
                <Banner
                    title="How to create campaign?"
                    status="info"
                    onDismiss={() => {}}
                    >
                    <p><strong>Step 1</strong> create campaign</p>
                    <p><strong>Step 2</strong> set application by type (product or collection or all stock)</p>
                    <p><strong>Step 3</strong> set mystery discount rule</p>
            </Banner>
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 4, sm: 3, md: 3, lg: 4, xl: 4}}>

                <img style={{marginTop:"-8px"}} src={vedio}/>

        </Grid.Cell>
      </Grid>
    </Page>
  );
}
export default Dashboard;
