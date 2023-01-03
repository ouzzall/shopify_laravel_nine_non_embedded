import { Page, DataTable, Grid, Card, Text, Button, TextField, Icon } from "@shopify/polaris";
import React, { useEffect } from "react";
import { useState } from "react";
import { SearchMajor } from "@shopify/polaris-icons";
import "./css/style.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faEye);

function Rules() {

    const [searchFieldValue, setSearchFieldValue] = useState("");

    const [tableRowsStatic,setTableRowsStatic] = useState([]);

    const [tableRows,setTableRows] = useState([]);

    const [totalQrCount,setTotalQrCount] = useState(0);

    useEffect(() => {

        fetch(`/get_rules_data`)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            if(result.success == true)
            {
                const my_rows = [];

                result.data.forEach(element => {
                    my_rows.push([

                    <div style={{marginTop:"13px"}}>{element.name}</div>,
                    element.discount_type,
                    element.upto_amount,

                    <FontAwesomeIcon style={{fontSize:"18px",cursor:"pointer"}} icon="fa-solid fa-trash" />
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

    return (
        <Page fullWidth>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h1
                    className="Polaris-Header-Title"
                    style={{ paddingBottom: "20px", paddingTop: "10px" }}
                >
                    Rules
                </h1>
                <TextField
                    type="text"
                    value={searchFieldValue}
                    onChange={(e) => setSearchFieldValue(e)}
                    prefix={<Icon source={SearchMajor} color="base" />}
                    autoComplete="off"
                />
            </div>
            <Grid>
                <Grid.Cell
                    columnSpan={{ xs: 12, sm: 6, md: 6, lg: 12, xl: 12 }}
                >
                    <div style={{ marginBottom: "60px" }}>
                        <Card>
                            <div className="camplainTable">
                                <DataTable
                                    columnContentTypes={[
                                        "text",
                                        "text",
                                        "text",
                                        "text",
                                    ]}
                                    headings={[
                                        "Rule Name",
                                        "Discount Type",
                                        "Discount",
                                        "Action",
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
export default Rules;
