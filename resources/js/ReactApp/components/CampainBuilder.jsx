import {Page, Card, Button, Icon, TextField, Select, DatePicker} from '@shopify/polaris';
import {useState,useCallback} from 'react';
import React from 'react';
import { MobilePlusMajor } from '@shopify/polaris-icons';
function Dashboard() {
    const [storeName, setStoreName] = useState('Jaded Pixel');

  const handleStoreName = useCallback((newValue) => setStoreName(newValue), []);
  const [ruleName, setRuleName] = useState('');

  const handleRuleName = useCallback((newValue) => setRuleName(newValue), []);

  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  const [selectedApplyOnOptions, setSelectedApplyOnOptions] = useState('product');

  const handleApplyOnOptions = useCallback((value) => setSelectedApplyOnOptions(value), []);
  const applyOnOptions = [
    {label: 'Product', value: 'product'},
    {label: 'Collection', value: 'collection'},
    {label: 'All Store', value: 'allStore'},
  ];
  const [selectedPreset, setSelectedPreset] = useState('selectpreset');

  const handlePresetSelectChange = useCallback((value) => setSelectedPreset(value), []);

  const presetOptions = [
    {label: 'Select  Preset', value: 'selectpreset'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];
  const [selectedDiscount, setSelectedDiscount] = useState('fixed');

  const handleDiscountChange = useCallback((value) => setSelectedDiscount(value), []);

  const discountOptions = [
    {label: 'Fixed Discount', value: 'fixed'},
    {label: 'Percentage', value: 'percentage'},
  ];
  const [uptoFieldValue, setUptoFieldValue] = useState( );

  const handleUptoFieldChange = useCallback(
    (value) => setUptoFieldValue(value),
    [],
  );
// date range code stat
const [datePickerCheck, setDatePickerCheck] = useState(false);
  function handleDuration() {
    setDatePickerCheck(datePickerCheck => !datePickerCheck);
  }
    const [{month, year}, setDate] = useState({month: 1, year: 2018});
    const [selectedDates, setSelectedDates] = useState({
      start: new Date('Wed Feb 07 2018 '),
      end: new Date('Mon Mar 12 2018 '),
    });

    const handleMonthChange = useCallback(
      (month, year) => setDate({month, year}),
      [],
    );
    console.log(selectedDates);
    console.log(selectedDates['start']);
    console.log(selectedDates['end']);

        var date = new Date(selectedDates['start']),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        const myStartDate = [date.getFullYear(), mnth, day].join("-");
        var enddate = new Date(selectedDates['end']),
          endMnth = ("0" + (enddate.getMonth() + 1)).slice(-2),
          endDay = ("0" + enddate.getDate()).slice(-2);
        const myEndDate = [enddate.getFullYear(), endMnth, endDay].join("-");
        console.log(myStartDate);
        console.log(myEndDate);

const dateRange= `${myStartDate}  to  ${myEndDate}`;


// date range code end
    return (
      <Page>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <h1 className="Polaris-Header-Title" style={{paddingBottom:"20px",paddingTop:"10px"}}>Campaign Builder</h1>
            <Button primary >Create Campaign</Button>
        </div>

        <Card title="Create Campaign" >
            {/* <Card.Section>
            </Card.Section> */}
            <div style={{paddingLeft:"40px",maxWidth: "650px"}}>
            <Card.Section>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <p>Campaign Name</p>
                    <div style={{width:"300px"}}>
                        <TextField
                        value={storeName}
                        onChange={handleStoreName}
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
                        onChange={handleApplyOnOptions}
                        value={selectedApplyOnOptions}
                        />
                    </div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"20px"}}>
                    <p></p>
                    <div style={{width:"300px"}}>
                        <Select
                        options={options}
                        onChange={handleSelectChange}
                        value={selected}
                        />
                    </div>
                </div>
            </Card.Section>
            </div>
            <Card.Section>
                <div style={{paddingLeft:"40px",maxWidth: "610px"}}>

                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",borderTop: "1px solid #e1e3e5",paddingTop:"20px"}}>
                    <p>Select Duration</p>
                    <div style={{width:"300px"}} >

                         {/* <TextField
                        onFocus={handleDuration}
                        value={dateRange}
                        /> */}
                        <button  onClick={handleDuration} style={{background:"transparent",border:"1px solid #babfc4",borderRadius:"4px",padding:"9px 70px"}}>{dateRange}</button>
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
                        onChange={handlePresetSelectChange}
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
                            onChange={handleRuleName}
                            autoComplete="off"
                            />
                        </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"20px"}}>
                        <p>Select Discount Type</p>
                        <div style={{width:"300px"}}>
                          <Select
                            options={discountOptions}
                            onChange={handleDiscountChange}
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
                            onChange={handleUptoFieldChange}
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
export default Dashboard;
