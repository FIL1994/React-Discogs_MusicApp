//Action Index
import axios from 'axios';

export const FETCH_SEARCH_RESULTS = 'fetch_search';
export const MODIFY_SEARCHING = 'modify_searching';
export const MODIFY_SEARCHING_ARTIST_RELEASES = "modify_searching_artist_releases";
export const FETCH_TYPE_INFO = 'fetch_type_info';
export const FETCH_ARTIST_RELEASES = 'fetch_artist_releases';
export const LOADING_ARTIST_RELEASES = "loading_artist_releases";

const ROOT_URL = 'https://api.discogs.com';
//Discogs API
const SECRET = '';
const API_KEY = '';
const SIG = `?key=${API_KEY}&secret=${SECRET}`;

//get search results
export function fetchSearchResults(values, callback) {
    //"https://api.discogs.com/database/search?q=" + $scope.search + "&page=1&per_page=10";
    //console.log("values", values);
    const page = "&page=1&per_page=10";
    const query = values.txtSearch;
    const searchOption = values.searchOption || "";
    const requestURL = `${ROOT_URL}/database/search${SIG}${page}&q=${query}&type=${searchOption}`;
    const request = axios.get(requestURL);
    console.log(requestURL);
    return{
        type: FETCH_SEARCH_RESULTS,
        payload: request
    };
}
//is searching
export function setSearch() {
    return{
        type: MODIFY_SEARCHING
    }
}

export function loadingArtistReleases() {
    return{
        type: LOADING_ARTIST_RELEASES
    }
}

export function fetchInfoByType(id, type, callback) {
    let typeUrl;
    switch (type){
        case "release":
            typeUrl = "/releases/";
            break;
        case "artist":
            typeUrl = "/artists/";
            break;
        case "label":
            typeUrl = "/labels/";
            break;
        case "master":
            typeUrl = "/masters/";
            break;
    }

    const request = axios.get(`${ROOT_URL}${typeUrl}${id}${SIG}`);

    return{
        type: FETCH_TYPE_INFO,
        payload: request
    };
}

function toNumber(num) {
    num = Number(num);
    return isNaN(num) ? 1 : num;
}

export function fetchArtistReleases(id, page, sortBy, asc) {

    const goToPage = `&per_page=30&page=${toNumber(page) }`;
    let requestURL = `${ROOT_URL}/artists/${toNumber(id)}/releases${SIG}${goToPage}`;
    if(sortBy){
        requestURL+="&sort=" + sortBy;
    }
    if(asc !== null || asc !== undefined){
        requestURL+="&sort_order=" + (asc ? "asc" : "desc");
    }
    //console.log("REQUEST", requestURL);
    const request = axios.get(requestURL);
    return{
        type: FETCH_ARTIST_RELEASES,
        payload: request
    };
}