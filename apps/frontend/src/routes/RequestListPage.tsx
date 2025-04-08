import {trpc} from "../lib/trpc.ts";


export default function RequestListPage(){
    const { data, isLoading, error } = trpc.requestList.useQuery();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return(
       <div>
            {data?.map((res, index) => (
                <li key={index} className="mb-2">
                    <strong>Request {res.request_id}:</strong> {res.request_id}, {res.room_num}, {res.language}, {res.request_type}
       </li>
            ))}
       </div>
    )
}