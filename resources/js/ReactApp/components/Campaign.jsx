import {Page, DataTable, Grid, Card, Text, Banner, Button, TextField, Icon, Select, Checkbox} from '@shopify/polaris';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { DuplicateMinor, EditMajor, SearchMajor } from '@shopify/polaris-icons';
import "./css/style.css";
import "./css/toggle.css";
import vedio from '../components/imges/image_one.png';
import  Toggle  from './Toggle';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faEye,
    faTrash
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faTrash,
    faEye
);

function Campaign() {

    const [loading, setLoading] = useState(false);
    const [active2, setActive2] = useState(false);
    const toggleActive = useCallback(() => setActive2((active2) => !active2), []);

    const [active, setActive] = useState(false);
    const handleChange = useCallback(() => setActive(!active), [active]);


    const [tableRowsStatic,setTableRowsStatic] = useState([]);
    const [tableRows,setTableRows] = useState([]);


    const [reload,setReload] = useState(false);

    const navigate = useNavigate();


    const [selectedFilterBy, setSelectedFilterBy] = useState('today');

    const handleSelectChange = useCallback((value) => setSelectedFilterBy(value), []);

    const filterByOptions = [
      {label: 'Filter By', value: ''},
      {label: 'Yesterday', value: 'yesterday'},
      {label: 'Last 7 days', value: 'lastWeek'},
    ];
    const [allSwitchChecked, setAllSwitchChecked] = useState(false);
    const handleChangeAllSwitchChecked = useCallback((newChecked) => setAllSwitchChecked(newChecked), []);

    const [searchFieldValue, setSearchFieldValue] = useState('');

    useEffect(() => {
        setTableRows(tableRowsStatic.filter((value) => value[1].toLowerCase().includes(searchFieldValue.toLowerCase())));
    },[searchFieldValue]);
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
        <Button primary onClick={()=>navigate('/campaign-builder')} >Create Campaign</Button>
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
                            ]}
                            headings={[
                                'Compaign Name',
                                'Duration',
                                'Link',
                                'Action',
                                'Switch',
                            ]}
                            // rows={tableRows && tableRows}
                            rows={


                                [
                                    [
                                    <div>
                                        <Text variant="headingMd" as="h6">
                                            Online store dashboard
                                        </Text>
                                        <p>Collection</p>
                                    </div>,
                                    "7 Oct - 13 Oct",

                                    <Button plain><div style={{display:"flex"}}><Icon
                                    source={DuplicateMinor}
                                    color="base"
                                  /> Copy Link</div></Button>,
                                  <button className='customEditBtn' ><div style={{display:"flex"}}><div className='eitBtnIcon'><Icon
                                  source={EditMajor}
                                  color="base"
                                /></div>  Edit</div></button>,
                                <Toggle
                                toggled={true}
                                onClick={logState}
                            />,
                                    ],
                                    [
                                        <div>
                                            <Text variant="headingMd" as="h6">
                                                Online store dashboard
                                            </Text>
                                            <p>Collection</p>
                                        </div>,
                                        "7 Oct - 13 Oct",

                                        <Button plain><div style={{display:"flex"}}><Icon
                                        source={DuplicateMinor}
                                        color="base"
                                      /> Copy Link</div></Button>,
                                      <button className='customEditBtn' ><div style={{display:"flex"}}><div className='eitBtnIcon'><Icon
                                      source={EditMajor}
                                      color="base"
                                    /></div>  Edit</div></button>,
                                    <Toggle
                                    toggled={true}
                                    onClick={logState}
                                />,
                                        ],
                                        [
                                            <div>
                                                <Text variant="headingMd" as="h6">
                                                    Online store dashboard
                                                </Text>
                                                <p>Collection</p>
                                            </div>,
                                            "7 Oct - 13 Oct",

                                            <Button plain><div style={{display:"flex"}}><Icon
                                            source={DuplicateMinor}
                                            color="base"
                                          /> Copy Link</div></Button>,
                                          <button className='customEditBtn' ><div style={{display:"flex"}}><div className='eitBtnIcon'><Icon
                                          source={EditMajor}
                                          color="base"
                                        /></div>  Edit</div></button>,
                                        <Toggle
                                        toggled={true}
                                        onClick={logState}
                                    />,
                                            ],
                                ]
                            }
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
