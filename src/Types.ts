import { ColorValue, ImageSourcePropType } from "react-native";

export type PhotoTypes = {
    farm : number,
    height_s:number,
    id: string,
    isfamily:number,
    isfriend: number,
    ispublic: number,
    owner: string,
    secret:string,
    server: string,
    title: string,
    url_s: string,
    width_s:number
}

export type TabIconPropType = {
    icon : ImageSourcePropType,
    color : ColorValue,
    name:String,
    focused :Boolean
};