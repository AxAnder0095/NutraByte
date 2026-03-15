import { useEffect, useState } from "react";
import api from "../api/api.ts";

interface Sample {
    _id: string; // _id field for MongoDB documents
    name: string;
    value: number;
}

export const TestPage = () => {
    const [data, setData] = useState<Sample[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try{
            const response = await api.get<Sample[]>("/sample");
            console.log("Fetched data:", response.data);
            setData(response.data);
        }catch(error: any | unknown){
            setError(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Test Page</h1>
            <p>This is a test page to verify routing and component rendering.</p>
            {data && data.map((item) => (
                <div key={item._id}>
                    <h2>{item.name}</h2>
                    <p>Value: {item.value}</p>
                </div>
            ))}
        </div>
    )
};