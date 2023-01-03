import {Page, DataTable, Grid, Card, Text, Banner, Button, TextField, Icon, Select, Checkbox} from '@shopify/polaris';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { DuplicateMinor, EditMajor, SearchMajor } from '@shopify/polaris-icons';
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



    useEffect(() => {

        fetch(`/get_all_campaigns`)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            if(result.success == true)
            {
                const my_rows = [];

                result.data.forEach(element => {
                    my_rows.push([

                    <div>
                        <Text variant="headingMd" as="h6">
                            {element.name}
                        </Text>
                        <p>{element.discount_on}</p>
                    </div>,

                    <p>{element.discount_on}</p>,

                    `${element.start_date} - ${element.end_date}`,

                    <Button plain>
                        <div style={{display:"flex"}}>
                            <Icon source={DuplicateMinor} color="base" /> Copy Link
                        </div>
                    </Button>,

                    <Toggle toggled={true} onClick={logState} />,

                    <div style={{display:"flex"}}>
                        <FontAwesomeIcon style={{fontSize:"18px",cursor:"pointer"}} icon="fa-solid fa-pencil" />
                        <div style={{marginLeft:"10px"}}>
                            <FontAwesomeIcon style={{fontSize:"18px",cursor:"pointer"}} icon="fa-solid fa-trash" />
                        </div>
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

  return (
    <Page fullWidth>
         <Grid>
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
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h1 className="Polaris-Header-Title" style={{paddingBottom:"20px",paddingTop:"10px"}}>Campaign Builder</h1>
        <Button primary onClick={()=>navigate('/new-campaign')} >New Campaign +</Button>
      </div>
        <Grid>
            <Grid.Cell columnSpan={{xs: 12, sm: 6, md: 6, lg: 12, xl: 12}}>
                <div style={{marginBottom:"60px"}}>
                    <Card>
                    <div style={{display:"flex",padding: "20px",alignItems:"center",}}>
                        <TextField
                                type="text"
                                value={searchFieldValue}
                                onChange={(e) => setSearchFieldValue(e)}
                                prefix={<Icon source={SearchMajor}color="base"/>}
                                autoComplete="off"
                                />
                            <div style={{margin: "0 10px"}}>
                                <Select
                                    options={filterByOptions}
                                    onChange={handleSelectChange}
                                    value={selectedFilterBy}
                                    />
                            </div>
                            <div>
                              <Checkbox
                                label="Select all Switches"
                                checked={allSwitchChecked}
                                onChange={handleChangeAllSwitchChecked}
                                />
                            </div>
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
                                'Compaign Name',
                                'Applied On',
                                'Duration',
                                'Link',
                                'Action',
                                'Switch',
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
