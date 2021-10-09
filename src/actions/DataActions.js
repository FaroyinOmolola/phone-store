import {
	DATA_REQUEST,
	DATA_SUCCESS,
	DATA_FAIL,
} from "../constants/DataConstants";
import Axios from "axios";
import { URL } from "../config";

export const dataFetched =
	({ page, brand, storage, minPrice, maxPrice, search, grade }) =>
	async (dispatch) => {
		dispatch({
			type: DATA_REQUEST,
		});
		try {
			const { data } = await Axios.get(
				`${URL}/sell-request/in-stock?sort=new&limit=20&page=${
					page || 1
				}&minPrice=${minPrice || 0}&maxPrice=${
					maxPrice || 2500
				}&storageSizeString=${storage || ""}&conditionString=${
					grade || ""
				}&category=Smartphones&brand=${
					brand || "Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus"
				}`
			);

			dispatch({
				type: DATA_SUCCESS,
				payload: data.data,
			});
		} catch (err) {
			dispatch({
				type: DATA_FAIL,
				payload: err.message,
			});
		}
	};
