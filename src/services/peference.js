import { User, Cloud } from "parse";

export const setPreference = ( preference ) => {
    Cloud.run("setPreference", preference)
}
