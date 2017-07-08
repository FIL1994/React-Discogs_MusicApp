/**
 * Action Index
 * 
 * @author Philip Van Raalte
 * @date 2017-06-10.
 *
 * These are the redux actions.
 * They send data from the application to the store.
 */
import axios from 'axios';

//action types
export const FETCH_SEARCH_RESULTS = 'fetch_search';
export const MODIFY_SEARCHING = 'modify_searching';
export const MODIFY_SEARCHING_ARTIST_RELEASES = "modify_searching_artist_releases";
export const FETCH_TYPE_INFO = 'fetch_type_info';
export const FETCH_ARTIST_RELEASES = 'fetch_artist_releases';
export const LOADING_ARTIST_RELEASES = "loading_artist_releases";

//API Info
const ROOT_URL = 'https://api.discogs.com';
//Discogs API
const SECRET = '';
const API_KEY = '';
const SIG = `?key=${API_KEY}&secret=${SECRET}`;

/**
 * Get the search results
 * @param searchParams parameters for the search
 * @returns {{type: string, payload: AxiosPromise}}
 */
export function fetchSearchResults(searchParams) {
    //"https://api.discogs.com/database/search?q=" + $scope.search + "&page=1&per_page=10";
    //console.log("values", values);
    const page = "&page=1&per_page=10"; //which page to show and how many results per page
    const query = searchParams.txtSearch; //what the user searched for
    const searchOption = searchParams.searchOption || ""; //result types. e.g. artist, label, release
    const requestURL = `${ROOT_URL}/database/search${SIG}${page}&q=${query}&type=${searchOption}`;
    const request = axios.get(requestURL); //async retrieval of results
    return{
        type: FETCH_SEARCH_RESULTS,
        payload: request
    };
}

/**
 * Used for identifying when the application is searching so it can display a loading circle.
 * @returns {{type: string}}
 */
export function setSearch() {
    return{
        type: MODIFY_SEARCHING
    }
}

/**
 * Loading results for artist releases
 * @returns {{type: string}}
 */
export function loadingArtistReleases() {
    return{
        type: LOADING_ARTIST_RELEASES
    }
}

/**
 * Get info for a particular item such as a release, artist, label or master
 * @param id the unique identifier for the item
 * @param type the type of the item (artist, release, label, etc.)
 * @returns {{type: string, payload: AxiosPromise}}
 */
export function fetchInfoByType(id, type) {
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

/**
 * Cast to a number
 * @param num
 * @returns {*}
 */
function toNumber(num) {
    num = Number(num);
    return isNaN(num) ? 1 : num;
}

/**
 * Get the releases of a particular artist
 * @param id the id of the artist
 * @param page the page of results
 * @param sortBy year, title, format
 * @param asc sort ascending or descending
 * @returns {{type: string, payload: AxiosPromise}}
 */
export function fetchArtistReleases(id, page, sortBy, asc) {

    const goToPage = `&per_page=30&page=${toNumber(page) }`;
    let requestURL = `${ROOT_URL}/artists/${toNumber(id)}/releases${SIG}${goToPage}`;
    if(sortBy){
        requestURL+="&sort=" + sortBy;
    }
    if(asc !== null || asc !== undefined){
        requestURL+="&sort_order=" + (asc ? "asc" : "desc");
    }
    const request = axios.get(requestURL);
    return{
        type: FETCH_ARTIST_RELEASES,
        payload: request
    };
}