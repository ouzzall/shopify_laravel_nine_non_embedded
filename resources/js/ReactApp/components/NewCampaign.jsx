import {Page, Card, Button, Icon, TextField, Select, DatePicker} from '@shopify/polaris';
import {useState,useCallback, useEffect} from 'react';
import React from 'react';
import { MobilePlusMajor } from '@shopify/polaris-icons';
import { useNavigate } from 'react-router-dom';

function NewCampaign() {

    useEffect(() => {

        fetch( "/get_create_campaign_data" )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.success === true) {
                setFetchResponse([data.data1,data.data2]);

                const temp = [];
                data.data1.forEach(element => temp.push({value:`${element.id}`, label:`${element.product_title}`}));
                setFurtherOptions(temp);
                if(temp.length > 0)
                    setSelectedFurtherOption(`${temp[0].value}`);

                const temp2 = [];
                data.data3.forEach(element => temp2.push({value:`${element.id}`, label:`${element.name}`}));
                setPresetOptions(temp2);
                if(temp2.length > 0)
                    setSelectedPreset(`${temp2[0].value}`);
            } else if(data.success === false) {

            }
        });

    },[]);



    const navigate = useNavigate();

    const [campaignName, setCampaignName] = useState('');

    const [showProductCollection, setShowProductCollection] = useState(true);

    const [fetchResponse, setFetchResponse] = useState(false);

    const [selectedApplyOnOptions, setSelectedApplyOnOptions] = useState('product');
    const applyOnOptions = [
        {label: 'Product', value: 'product'},
        {label: 'Collection', value: 'collection'},
        {label: 'All Store', value: 'all_store'},
    ];

    const [selectedFurtherOption, setSelectedFurtherOption] = useState("");
    const [furtherOptions, setFurtherOptions] = useState([]);

    const [datePickerCheck, setDatePickerCheck] = useState(false);

    const [{month, year}, setDate] = useState({month: new Date().getMonth(), year: new Date().getFullYear()});
    // new Date("2010-02-18")
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

    const [selectedPreset, setSelectedPreset] = useState('');
    const [presetOptions, setPresetOptions] = useState([]);

    const [ruleName, setRuleName] = useState('');

    const [selectedDiscount, setSelectedDiscount] = useState('fixed');
    const discountOptions = [
        {label: 'Fixed Discount', value: 'fixed'},
        {label: 'Percentage', value: 'percentage'},
    ];

    const [uptoFieldValue, setUptoFieldValue] = useState("");

    const [newRuleShow, setNewRuleShow] = useState(false);

    useEffect(() => {

        console.log(selectedPreset);

    },[selectedPreset]);






    const syncHandler = () => {
        fetch( "/sync_store", {
                method: "POST",
                // headers: { "content-Type": "application/json" },
                // body: formData,
            }
        )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.success === true) {

            } else if(data.success === false) {

            }
        });
    }

    const changeDiscountByHandler = (e) => {
        setSelectedApplyOnOptions(e);
        // console.log(e);

        if(e == "all_store")
        {
            setShowProductCollection(false);
        }
        else if(e == "collection"){
            setShowProductCollection(true);
            const temp = [];
            console.log(fetchResponse);
            fetchResponse[1].forEach(element => temp.push({value: `${element.id}`, label:`${element.collection_title}`}));
            setFurtherOptions(temp);
            if(temp.length > 0)
                setSelectedFurtherOption(`${temp[0].value}`);
        }
        else if(e == "product"){
            setShowProductCollection(true);
            const temp = [];
            console.log(fetchResponse);
            fetchResponse[0].forEach(element => temp.push({value: `${element.id}`, label:`${element.product_title}`}));
            setFurtherOptions(temp);
            if(temp.length > 0)
                setSelectedFurtherOption(`${temp[0].value}`);
        }
    }

    const createCampaignHandler = () => {

        var date = new Date(selectedDates['start']),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        const startDate = [date.getFullYear(), mnth, day].join("-");
        var enddate = new Date(selectedDates['end']),
        endMnth = ("0" + (enddate.getMonth() + 1)).slice(-2),
        endDay = ("0" + enddate.getDate()).slice(-2);
        const endDate = [enddate.getFullYear(), endMnth, endDay].join("-");

        const formData = new FormData();

        formData.append("campaign_name", campaignName);
        formData.append("discount_by", selectedApplyOnOptions);
        formData.append("further_option", selectedFurtherOption);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        formData.append("discount_rule_id", selectedPreset);

        fetch( "/add_new_campaign", {
                method: "POST",
                // headers: { "content-Type": "application/json" },
                body: formData,
            }
        )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.success === true) {
                navigate("/campaigns");
            } else if(data.success === false) {

            }
        });
    }

    const addNewRuleHandler = () => {
        setNewRuleShow(true)
        setRuleName("");
        setSelectedDiscount("fixed");
        setUptoFieldValue(0);
    }

    const newDiscountRuleHandler = () => {

        const formData = new FormData();

        formData.append("rule_name", ruleName);
        formData.append("discount_type", selectedDiscount);
        formData.append("upto_amount", uptoFieldValue);

        fetch( "/add_new_discount_rule", {
                method: "POST",
                // headers: { "content-Type": "application/json" },
                body: formData,
            }
        )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.success === true) {
                const temp2 = [];
                data.data.forEach(element => temp2.push({value:`${element.id}`, label:`${element.name}`}));
                setPresetOptions(temp2);
                if(temp2.length > 0)
                    setSelectedPreset(`${data.selected_discount_rule.id}`);
            } else if(data.success === false) {

            }
        });
    }




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
                    <div style={{display:"flex"}}>
                        <div style={{width:"222px"}}>
                            <Select
                                options={applyOnOptions}
                                onChange={(e) => changeDiscountByHandler(e)}
                                value={selectedApplyOnOptions}
                            />
                        </div>
                        <div style={{marginLeft:"10px"}}>
                            <Button primary onClick={syncHandler}>SYNC</Button>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"20px"}}>
                    <p></p>
                    {showProductCollection &&
                        <div style={{width:"300px"}}>
                            <Select
                            options={furtherOptions}
                            onChange={(e) => setSelectedFurtherOption(e)}
                            value={selectedFurtherOption}
                            />
                        </div>
                    }
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
                            <button style={{color:"#008060",background:"transparent",border:"none",fontSize:"14px",fontWeight:"600"}}>
                                <div style={{display:"flex"}} onClick={addNewRuleHandler}>
                                    <div style={{width:"18px",marginRight:"8px"}}>
                                        <Icon
                                            source={MobilePlusMajor}
                                            color="primary"
                                        />
                                    </div>
                                    Create new
                                </div>
                            </button>

                        </div>
                    </div>
                </div>
                {newRuleShow &&
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
                            <Button primary onClick={newDiscountRuleHandler}>Save theme</Button>
                        </div>
                    </div>
                }
            </Card.Section>

            </div>
            <div style={{display:"flex",justifyContent:"flex-end",paddingLeft:"40px",paddingRight:"40px",paddingBottom:"20px",marginTop:"40px"}}>
                <div style={{display:"flex"}}>
                    <Button onClick={() => navigate("/campaigns")}>Cancel</Button>
                    <div style={{marginLeft:"10px"}}>
                        <Button primary onClick={createCampaignHandler}>Create Compaign</Button>
                    </div>
                </div>
            </div>
        </Card>
      </Page>
    );
}
export default NewCampaign;
