import {Page, Card, Button, Icon, TextField, Select, DatePicker} from '@shopify/polaris';
import {useState,useCallback} from 'react';
import React from 'react';
import { MobilePlusMajor } from '@shopify/polaris-icons';

function NewCampaign() {

    const [campaignName, setCampaignName] = useState('');

    const [selectedApplyOnOptions, setSelectedApplyOnOptions] = useState('product');
    const applyOnOptions = [
        {label: 'Product', value: 'product'},
        {label: 'Collection', value: 'collection'},
        {label: 'All Store', value: 'all_store'},
    ];

    const [selectedFurtherOption, setSelectedFurtherOption] = useState("today");
    const furtherOptions = [
        {label: 'Today', value: 'today'},
        {label: 'Yesterday', value: 'yesterday'},
        {label: 'Last 7 days', value: 'lastWeek'},
    ];

    const [datePickerCheck, setDatePickerCheck] = useState(false);

    const [{month, year}, setDate] = useState({month: new Date().getMonth(), year: new Date().getFullYear()});
    const [selectedDates, setSelectedDates] = useState({ start: new Date(), end: new Date() });
    const handleMonthChange = useCallback((month, year) => setDate({month, year}), [],);

    var date = new Date(selectedDates['start']),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    const myStartDate = [date.getFullYear(), mnth, day].join("-");
    var enddate = new Date(selectedDates['end']),
    endMnth = ("0" + (enddate.getMonth() + 1)).slice(-2),
    endDay = ("0" + enddate.getDate()).slice(-2);
    const myEndDate = [enddate.getFullYear(), endMnth, endDay].join("-");
    // console.log(myStartDate);
    // console.log(myEndDate);
    const dateRange= `${myStartDate}  to  ${myEndDate}`;

    const [selectedPreset, setSelectedPreset] = useState('selectpreset');
    const presetOptions = [
        {label: 'Select  Preset', value: 'selectpreset'},
        {label: 'Yesterday', value: 'yesterday'},
        {label: 'Last 7 days', value: 'lastWeek'},
    ];

    const [ruleName, setRuleName] = useState('');

    const [selectedDiscount, setSelectedDiscount] = useState('fixed');
    const discountOptions = [
        {label: 'Fixed Discount', value: 'fixed'},
        {label: 'Percentage', value: 'percentage'},
    ];

    const [uptoFieldValue, setUptoFieldValue] = useState("");

    return (
      <Page>
        <Card title="Create Campaign" >
            {/* <Card.Section>
            </Card.Section> */}
            <div style={{paddingLeft:"40px",maxWidth: "650px"}}>
            <Card.Section>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <p>Campaign Name</p>
                    <div style={{width:"300px"}}>
                        <TextField
                        value={campaignName}
                        onChange={(e) => setCampaignName(e)}
                        autoComplete="off"
                        />
                    </div>
                </div>
            </Card.Section>
            <Card.Section>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <p>Apply Mystery discount by</p>
                    <div style={{width:"300px"}}>
                        <Select
                            options={applyOnOptions}
                            onChange={(e) => setSelectedApplyOnOptions(e)}
                            value={selectedApplyOnOptions}
                        />
                    </div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"20px"}}>
                    <p></p>
                    <div style={{width:"300px"}}>
                        <Select
                        options={furtherOptions}
                        onChange={(e) => setSelectedFurtherOption(e)}
                        value={selectedFurtherOption}
                        />
                    </div>
                </div>
            </Card.Section>
            </div>
            <Card.Section>
                <div style={{paddingLeft:"40px",maxWidth: "610px"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop: "1px solid #e1e3e5",paddingTop:"20px"}}>
                        <p>Select Duration</p>
                        <div style={{width:"300px"}}>
                            <button  onClick={() => setDatePickerCheck(!datePickerCheck)} style={{background:"transparent",border:"1px solid #babfc4",borderRadius:"4px",padding:"9px 70px"}}>{dateRange}</button>
                            { datePickerCheck &&
                            <div className='datePickerDiv'>
                                <DatePicker
                                    month={month}
                                    year={year}
                                    onChange={setSelectedDates}
                                    onMonthChange={handleMonthChange}
                                    selected={selectedDates}
                                    allowRange
                                />
                            </div>
                            }
                        </div>
                    </div>
                </div>

            </Card.Section>
            <div style={{paddingLeft:"40px",maxWidth: "650px"}}>
            <Card.Section>
               <div style={{paddingTop:"20px",borderTop: "1px solid #e1e3e5"}}>
               <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <p>Discount Rule</p>
                    <div style={{width:"300px" ,display:"flex"}} >
                        <div style={{width:"190px"}}>
                       <Select
                        options={presetOptions}
                        onChange={(e) => setSelectedPreset(e)}
                        value={selectedPreset}
                        />
                        </div>
                        <button style={{color:"#008060",background:"transparent",border:"none",fontSize:"14px",fontWeight:"600"}}><div style={{display:"flex"}}><div style={{width:"18px",marginRight:"8px"}}><Icon
                            source={MobilePlusMajor}
                            color="primary"
                            /></div>Create new</div></button>

                    </div>
                </div>
                </div>
                <div style={{background:"#F6F6F7",padding:"20px",marginTop:"20px",borderRadius:"4px"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <p>Rule Name</p>
                        <div style={{width:"300px"}}>
                            <TextField
                            value={ruleName}
                            onChange={(e) => setRuleName(e)}
                            autoComplete="off"
                            />
                        </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"20px"}}>
                        <p>Select Discount Type</p>
                        <div style={{width:"300px"}}>
                          <Select
                            options={discountOptions}
                            onChange={(e) => setSelectedDiscount(e)}
                            value={selectedDiscount}
                            />
                        </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"20px"}}>
                        <p>Up to</p>
                        <div style={{width:"300px"}}>
                          <TextField
                            type="number"
                            prefix="$"
                            value={uptoFieldValue}
                            onChange={(e) => setUptoFieldValue(e)}
                            helpText="Enter the amount in multiple of 5"
                            autoComplete="off"
                            />
                        </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"end",marginTop:"20px"}}>
                        <Button primary>Save theme</Button>
                    </div>
                </div>
            </Card.Section>

            </div>
            <div style={{display:"flex",justifyContent:"space-between",paddingLeft:"40px",paddingRight:"40px",paddingBottom:"20px",marginTop:"40px"}}>
                <Button plain destructive>
                    Clear Card
                </Button>
                <div style={{display:"flex"}}>
                <Button >Cancel</Button>
                <div style={{marginLeft:"10px"}}>
                <Button primary>Create Compaign</Button>
                </div>
                </div>
            </div>
        </Card>
      </Page>
    );
}
export default NewCampaign;
