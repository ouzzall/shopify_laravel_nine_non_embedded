import {
    Page,
    DataTable,
    Grid,
    Card,
    Text,
    Button,
    TextField,
    Icon,
} from "@shopify/polaris";
import React from "react";
import { useState } from "react";
import { SearchMajor } from "@shopify/polaris-icons";
import "./css/style.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faEye);

function Rules() {
    const [searchFieldValue, setSearchFieldValue] = useState("");

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
                                    ]}
                                    headings={[
                                        "Rule Name",
                                        "Discount ",
                                        "Action",
                                    ]}
                                    // rows={tableRows && tableRows}
                                    rows={[
                                        [
                                            <div>
                                                <Text
                                                    variant="headingMd"
                                                    as="h6"
                                                >
                                                    Discount Rule 1
                                                </Text>
                                            </div>,
                                            "59 %",
                                            <Button plain destructive>
                                                Remove
                                            </Button>,
                                        ],
                                        [
                                            <div>
                                                <Text
                                                    variant="headingMd"
                                                    as="h6"
                                                >
                                                    Discount Rule 2
                                                </Text>
                                            </div>,
                                            "59",
                                            <Button plain destructive>
                                                Remove
                                            </Button>,
                                        ],
                                    ]}
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
