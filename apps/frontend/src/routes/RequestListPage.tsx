import {trpc} from "../lib/trpc.ts";


export default function RequestListPage(){
    const { data, isLoading, error } = trpc.requestList.useQuery();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return(
       <div>
            {data?.map((res, index) => (
                <ul key={index} className={"list-unstyled"}>
                {res.request_id}, {res.room_num}, {res.language}, {res.request_type}
                </ul>
            ))}
       </div>
    )
}