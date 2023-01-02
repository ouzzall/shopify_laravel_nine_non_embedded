import {Page, Grid, Card, Text, Button, Banner, ProgressBar, Icon} from '@shopify/polaris';
import {useEffect, useState,useCallback} from 'react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import vedio from '../components/imges/image_one.png';
import { CircleTickMajor } from '@shopify/polaris-icons';
function Dashboard() {
    return (
        <Page  >
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h1 className="Polaris-Header-Title" style={{paddingBottom:"20px",paddingTop:"10px"}}>Dashboard</h1>
        <Button primary >Create Campaign</Button>
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
            <Card  sectioned>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{display: "flex",}}>
                        <div style={{display: "flex",width: "63.53px",height: "63.53px",background: "linear-gradient(138.87deg, #3A416F 7.81%, #141727 95.71%)",boxShadow: "0px 3.5px 5.5px rgb(0 0 0 / 2%)",borderRadius: "8px"}}>
                            <Icon source={CircleTickMajor} color="success" />
                        </div>
                        <div style={{marginLeft:"10px"}}>
                            <div className="Polaris-Label" ><label style={{color: "#A0AEC0",marginBottom: "10px"}} id="PolarisTextField1Label" for="PolarisTextField1" className="Polaris-Label__Text"><span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular">Campaigns</span></label></div>
                            <Text variant="heading2xl" as="h3">480</Text>
                        </div>
                    </div>
                    <div>
                        <div style={{width: 225}}>
                            <div className="Polaris-Label" ><label style={{color: "#A0AEC0",marginBottom: "10px"}} id="PolarisTextField1Label" for="PolarisTextField1" className="Polaris-Label__Text"><span className="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--regular">60%</span></label></div>
                            <ProgressBar progress={60} color="primary" size="small"/>
                        </div>
                    </div>
                </div>
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
