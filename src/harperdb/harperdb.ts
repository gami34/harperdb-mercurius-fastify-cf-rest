import axios from "axios";

export const harperDB = async (data: string) =>
    axios({
        method: "post",
        url: process.env.HARPER_API_URI,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.HARPER_API_KEY}`,
        },
        data,
    });
