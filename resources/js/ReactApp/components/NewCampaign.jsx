import {Page, Card, Button, TextField, Select, DatePicker, Tag, Stack, Tooltip, Text, Icon, Popover} from '@shopify/polaris';
import {useState,useCallback, useEffect} from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightMinor, InfoMinor } from '@shopify/polaris-icons';
import "./css/style.css";

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

            } else if(data.success === false) {

            }
        });

    },[]);





    const [newTag, setNewTag] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const removeTagInside = useCallback(
        (tag) => () => {
            setSelectedTags((previousTags) =>
            previousTags.filter((previousTag) => previousTag !== tag),
            );
        }, [],
    );

    const tagMarkup = selectedTags.map((option) => (
        <Tag key={option} onRemove={removeTagInside(option)}>
            {option}
        </Tag>
    ));

    const navigate = useNavigate();

    const [campaignName, setCampaignName] = useState('');

    const [showProductCollection, setShowProductCollection] = useState(true);

    const [fetchResponse, setFetchResponse] = useState(false);

    const [selectedApplyOnOptions, setSelectedApplyOnOptions] = useState('product');
    const applyOnOptions = [
        {label: 'Particular Product', value: 'product'},
        {label: 'Particular Collection', value: 'collection'},
        {label: 'Store Wide', value: 'all_store'},
    ];

    const [selectedFurtherOption, setSelectedFurtherOption] = useState("");
    const [furtherOptions, setFurtherOptions] = useState([]);

    const [selectedDiscount, setSelectedDiscount] = useState('fixed');
    const discountOptions = [
        {label: 'Fixed Discount', value: 'fixed'},
        {label: 'Percentage', value: 'percentage'},
    ];




    const [{month, year}, setDate] = useState({month: new Date().getMonth(), year: new Date().getFullYear()});
    // new Date("2010-02-18")
    const [datePickerPopoverActive, setDatePickerPopoverActive] = useState(false);
    const setDatePickerTogglePopoverActive = useCallback(
      () => setDatePickerPopoverActive((datePickerPopoverActive) => !datePickerPopoverActive),
      [],
    );

    const [selectedDates, setSelectedDates] = useState({ start: new Date(), end: new Date() });
    const handleMonthChange = useCallback((month, year) => setDate({month, year}), [],);

    var date = new Date(selectedDates['start']);
    var enddate = new Date(selectedDates['end']);

    const monthArr = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    const myStartDate = date.getDate()+ " " +monthArr[date.getMonth()]+ " " +date.getFullYear();
    const myEndDate = enddate.getDate()+ " " +monthArr[enddate.getMonth()]+ " " +enddate.getFullYear();

    // console.log(myStartDate);
    // console.log(myEndDate);

    const dateRange= `${myStartDate} - ${myEndDate}`;

    const activator = (
        <div className="selectDate">
            <Button  onClick={setDatePickerTogglePopoverActive} disclosure>
            {dateRange}
            </Button>
      </div>
    );



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
        formData.append("discount_type", selectedDiscount);
        formData.append("discount_tags", JSON.stringify(selectedTags));

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

    const addTagHandler = () => {

        let temp = [...selectedTags];
        temp.push(newTag);
        setNewTag("");
        setSelectedTags(temp);

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
                    <p>Apply Mystery Discount to</p>
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
                        <div>
                            <div className='datePickerPopover'>
                                <Popover
                                    active={datePickerPopoverActive}
                                    activator={activator}
                                    autofocusTarget="first-node"
                                    onClose={setDatePickerTogglePopoverActive}
                                >
                                    <div style={{padding:"20px"}}>
                                    <div className='datepickerDropdownFields'>
                                        <TextField
                                            value={myStartDate}
                                            autoComplete="off"
                                        />
                                            <div className='iconDateDropdown'>
                                                <Icon
                                                source={ArrowRightMinor}
                                                color="base"
                                                />
                                            </div>
                                        <TextField
                                            value={myEndDate}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <DatePicker
                                        month={month}
                                        year={year}
                                        onChange={setSelectedDates}
                                        onMonthChange={handleMonthChange}
                                        selected={selectedDates}
                                        allowRange
                                        multiMonth
                                    />
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>

            </Card.Section>
            <div style={{paddingLeft:"40px",maxWidth: "650px"}}>
            <Card.Section>
               <div style={{paddingTop:"20px",borderTop: "1px solid #e1e3e5"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
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

                        <div style={{display:"flex"}}>
                            <p>Discount Tags</p>
                            <Tooltip active content="This is info regarding this function.">
                                <Text variant="bodyMd" fontWeight="bold" as="span">
                                    <div style={{marginLeft:"10px"}}> <Icon source={InfoMinor} color="base" /> </div>
                                </Text>
                            </Tooltip>
                        </div>
                        <div style={{width:"300px" ,display:"flex"}} >
                            <Card>
                                <div style={{ padding: "20px" }}>
                                    <div style={{ marginBottom: "5px", display: "flex", justifyContent: 'space-between' }}>
                                        <div style={{width:"100%",marginRight:"15px"}}>
                                            <TextField
                                                value={newTag}
                                                onChange={(e) => setNewTag(e)}
                                                placeholder="Add tags here"
                                                type="text"
                                                style={{width:"400px"}}
                                            />
                                        </div>
                                        <Button primary onClick={addTagHandler}>Add</Button>
                                    </div>
                                    <div className='tagsInput'>
                                        <Stack spacing="tight">{tagMarkup}</Stack>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Card.Section>

            </div>
            <div style={{display:"flex",justifyContent:"flex-end",paddingLeft:"40px",paddingRight:"40px",paddingBottom:"20px",marginTop:"40px"}}>
                <div style={{display:"flex"}}>
                    <Button onClick={() => navigate("/campaigns")}>Cancel</Button>
                    <div style={{marginLeft:"10px"}}>
                        <Button primary onClick={createCampaignHandler}>Create Campaign</Button>
                    </div>
                </div>
            </div>
        </Card>
      </Page>
    );
}
export default NewCampaign;
