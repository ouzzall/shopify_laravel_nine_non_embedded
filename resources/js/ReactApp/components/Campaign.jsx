import {Page, DataTable, Grid, Card, Text, Banner, Button, TextField, Icon, Select, Checkbox, Tabs, Tooltip, Badge} from '@shopify/polaris';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { DuplicateMinor, EditMajor,InfoMinor, MinusMinor, SearchMajor } from '@shopify/polaris-icons';
import "./css/style.css";
import "./css/toggle.css";
import vedio from '../components/imges/image_one.png';
import  Toggle  from './Toggle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faEye,
    faTrash,
    faPencil
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faTrash,
    faEye,
    faPencil
);

function Campaign() {

    const navigate = useNavigate();

    useEffect(() => {

        fetch(`/get_all_campaigns`)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            if(result.success == true)
            {
                const my_rows = [];

                result.data.forEach(element => {

                    const starting_date = new Date(element.start_date);
                    const end_date = new Date(element.end_date);
                    const monthArr = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

                    const myStartDate = starting_date.getDate()+ " " +monthArr[starting_date.getMonth()]+ " " +starting_date.getFullYear();
                    const myendDate = end_date.getDate()+ " " +monthArr[end_date.getMonth()]+ " " +end_date.getFullYear();


                    my_rows.push([

                    <div>
                        <Text variant="headingMd" as="h6">
                            {element.name}
                        </Text>
                        <p>{element.discount_on}</p>
                    </div>,

                    <p>{element.discount_on}</p>,

                    <div style={{display:"flex"}}> <Badge status="success">{myStartDate}</Badge> <div style={{width:"50px"}}> <Icon source={MinusMinor} color="base" /> </div> <Badge status="info">{myendDate}</Badge></div>,

                    <Button plain>
                        <div style={{display:"flex"}}>
                            <Icon source={DuplicateMinor} color="base" /> Copy Link
                        </div>
                    </Button>,

                    <Toggle toggled={true} onClick={logState} />,

                    <div style={{display:"flex"}}>
                        <div style={{marginRight:"10px"}}> <Button size="slim"> Edit </Button> </div>
                        <Button size="slim" primary> Duplicate </Button>
                    </div>
                    ]);
                });

                setTableRowsStatic(my_rows);
                setTableRows(my_rows);
                setTotalQrCount(result.count);
            }

        })
        .catch((err) => {
            console.log(err);
        });

    },[])

    const [searchFieldValue, setSearchFieldValue] = useState("");

    const [tableRowsStatic,setTableRowsStatic] = useState([]);

    const [tableRows,setTableRows] = useState([]);

    const [totalQrCount,setTotalQrCount] = useState(0);

    const [selectedFilterBy, setSelectedFilterBy] = useState('today');

    const handleSelectChange = useCallback((value) => setSelectedFilterBy(value), []);

    const filterByOptions = [
      {label: 'Filter By Type', value: ''},
      {label: 'Product Campaigns', value: 'product'},
      {label: 'Collection Campaigns', value: 'collection'},
      {label: 'Store Campaigns', value: 'all_store'},
    ];
    const [allSwitchChecked, setAllSwitchChecked] = useState(false);

    const handleChangeAllSwitchChecked = useCallback((newChecked) => setAllSwitchChecked(newChecked), []);

    const logState = state => {
        console.log("Toggled:", state)
    }

    const [selectedTab, setSelected] = useState(0);
    const handleTabChange = useCallback((selectedTabIndex) => {setSelected(selectedTabIndex); console.log(selectedTabIndex); },[],);

    const tabs = [
        {
        id: 'all-customers-1',
        content: 'All',
        },
        {
        id: 'accepts-marketing-1',
        content: 'Active',
        },
        {
        id: 'repeat-customers-1',
        content: 'Inactive',
        }
    ];

    return (
        <Page fullWidth>
            {/* <Grid>
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
            </Grid> */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <h1 className="Polaris-Header-Title" style={{paddingBottom:"20px",paddingTop:"10px"}}>Campaign Builder</h1>
                    <Button primary onClick={()=>navigate('/new-campaign')} >New Campaign +</Button>
            </div>
            <Grid>
                <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 12, xl: 12}}>
                    <div style={{marginBottom:"60px"}}>
                        <Card>
                            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
                            </Tabs>
                            <div style={{display:"flex",padding: "20px", paddingBottom:"0px",alignItems:"center",}}>
                                <TextField
                                    type="text"
                                    value={searchFieldValue}
                                    onChange={(e) => setSearchFieldValue(e)}
                                    prefix={<Icon source={SearchMajor}color="base"/>}
                                    autoComplete="off"
                                />
                                <div style={{marginLeft: "10px",width:"200px"}}>
                                    <Select
                                        options={filterByOptions}
                                        onChange={handleSelectChange}
                                        value={selectedFilterBy}
                                    />
                                </div>
                                <div style={{marginLeft:"10px"}}><Button>Select Date</Button></div>
                            </div>
                            <div className='camplainTable'>
                                <DataTable
                                    columnContentTypes={[
                                        'text',
                                        'text',
                                        'text',
                                        'text',
                                        'text',
                                        'text',
                                    ]}
                                    headings={[
                                        'Campaign Name',
                                        'Applied On',
                                        <div> Live Date <span style={{fontSize:"12px",color:"#898b8c"}}> (Duration) </span> </div>,
                                        <div style={{display:"flex"}}>
                                            <div> Link </div>
                                            <Tooltip active content="This is info regarding this function.">
                                                <Text variant="bodyMd" fontWeight="bold" as="span">
                                                    <div style={{marginLeft:"10px"}}> <Icon source={InfoMinor} color="base" /> </div>
                                                </Text>
                                            </Tooltip>
                                        </div>,
                                        'On/Off',
                                        'Edit',
                                    ]}
                                    rows={tableRows && tableRows}
                                />
                            </div>
                        </Card>
                    </div>
                </Grid.Cell>
            </Grid>
        </Page>
    );
}
export default Campaign;
