import { baseApi } from "../../api/baseApi";


const TeamApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getTeam : builder.query({
            query:()=>({
                url:"teams/teamMembers",
                method:"GET"
            })
        })
    })
})

export const {useGetTeamQuery} = TeamApi;