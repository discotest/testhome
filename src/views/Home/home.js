import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
} from 'react-router-dom';
//import BackgroundImage from 'components/BackgroundImage';
//import Album from 'components/Album';
//import defaultProfilePic from 'assets/default_profile.png';
import { MEDIUM_DEVICES_WIDTH } from 'utils/constants';
import Navbar from 'components/Navbar';

const MainContainer = styled.div`
    margin: auto;
    max-width: 100%;
    margin-bottom: 50px;
    @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
        width: 100%;
    }
    
    
    
`;

const HomeMenu = styled.div`

    .homenu-wrap {
        margin-left: 125px;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .homenu {
        display: inline-block;
        margin-left: 30px;
        font-size: 20px;
    }
    @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
        display: none;
    }
`;

  const Caroussel = styled.div`

    margin-bottom: 3rem;
    @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
        margin-bottom: -5rem;
    }
    

    h2 {
        color: #black;
        margin-top: 175px;
        font-size: 20px;
        font-family: Helvetica;
    }

    .FilterTitle {
        margin-left: 155px;
        @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
        font-size: 25px;
        margin-left: 12px;
        margin-top: 25px;
        margin-bottom: 14px;
    }
    }
    
    .scrolling-wrapper-flexbox {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        margin: auto;
        height: 250px;
        margin-bottom: 20px;
        width: 80%;
        -webkit-overflow-scrolling: touch;
        -moz--webkit-overflow-scrolling: touch; 
        &::-webkit-scrollbar {
        display: none;
        }
        &::-moz-scrollbar {
        display: none;
        }
        scrollbar-width: none;

        @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
        width: 100%; 
        margin-bottom: 0px;
    } 
 }

        
        .card {
        flex: 0 0 auto;
        margin-right: 18px;
        width: 170px;
        height: 170px;
        background: black;
        border-radius: 8px;

        @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
            width: 100px;
            height: 100px;
            margin-left: 12px;
            margin-right: 1px;
        }

        }

        .imagecard {
        width: 170px;
        height: 170px;
        border-radius: 8px;
        
        @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
            width: 100px;
            height: 100px;
        }
    }
        
        .songname {
            margin-top: -12px;
            color: #black;
            font-size: 16px;
            font-family: Helvetica;

            /* cut text if text is too big */
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width:170px; // some width

            @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
                font-size: 10px;
                width:100px;
                margin-top: -7px;
            }

        }

        .artist {
            margin-top: -29px;
            color: #666666;
            font-size: 14px;
            font-family: Helvetica;

            /* cut text if text is too big */
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width:170px;

            @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
                font-size: 12px;
                margin-top: -25px;
                width:100px;
        }
        }

        .SecondRow-Recommendations {
            margin-top: 1rem;
            @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
                margin-top: -5.5rem; 
        }
        }
  

`;


const Genres = styled.div`

    .genre-scrolling-wrapper-flexbox {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        margin: auto;
        height: 250px;
        margin-bottom: 20px;
        width: 80%;
        -webkit-overflow-scrolling: touch;
        -moz--webkit-overflow-scrolling: touch; 
        &::-webkit-scrollbar {
        display: none;
        }
        &::-moz-scrollbar {
        display: none;
        }
        scrollbar-width: none;

        @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
        width: 100%; 
        margin-bottom: 0px;
    } 
 }
    
    .genreimagecard {
            width: 350px;
            height: 150px;
            border-radius: 8px;
            
            @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
                width: 100px;
                height: 100px;
            }
        }

        .genrename {
            margin-top: -12px;
            color: #black;
            font-size: 16px;
            font-family: Helvetica;

            /* cut text if text is too big */
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width:170px; // some width

            @media (max-width: ${MEDIUM_DEVICES_WIDTH}px) {
                font-size: 10px;
                width:100px;
                margin-top: -7px;
            }

        }

`;


const Home = ({ darkMode }) => (
    <MainContainer>
        <Navbar />
        <HomeMenu>
            <div class="homenu-wrap">
                <div class="homenu"><h2>Home</h2></div>
                <div class="homenu"><h2>Library</h2></div>
                <div class="homenu"><h2>Trending</h2></div>
            </div>
        </HomeMenu>

        {/* FIRST CAROUSSEL: CONTINUE (show list of last viewed)*/}
        <Caroussel>

        <h1 class="FilterTitle">Continue</h1>

        <div class="scrolling-wrapper-flexbox">

            <div class="card">

                <img class="imagecard" src="https://is5-ssl.mzstatic.com/image/thumb/Music118/v4/1c/d6/5d/1cd65d7a-7f77-1379-ab6d-1bde7dcd7215/8718723091954.jpg/400x400cc.jpg"/>
                
                <div class="songname">
                    <h3>Maybe It Was Memphis</h3>
                </div>

                <div class="artist">
                    <h4>DJ Windows XP</h4>
                </div>
            </div>

            
            <div class="card">

                <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                
                <div class="songname">
                    <h3>Song</h3>
                </div>

                <div class="artist">
                    <h4>Artist</h4>
                </div>
            </div>
            <div class="card">

                <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                
                <div class="songname">
                    <h3>Song</h3>
                </div>

                <div class="artist">
                    <h4>Artist</h4>
                </div>
            </div>
            <div class="card">

                <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                
                <div class="songname">
                    <h3>Song</h3>
                </div>

                <div class="artist">
                    <h4>Artist</h4>
                </div>
            </div>
            <div class="card">

                <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                
                <div class="songname">
                    <h3>Song</h3>
                </div>

                <div class="artist">
                    <h4>Artist</h4>
                </div>
            </div>
            <div class="card">

                <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                
                <div class="songname">
                    <h3>Song</h3>
                </div>

                <div class="artist">
                    <h4>Artist</h4>
                </div>
            </div>
            <div class="card">

                <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                
                <div class="songname">
                    <h3>Song</h3>
                </div>

                <div class="artist">
                    <h4>Artist</h4>
                </div>
            </div>
            <div class="card">

                <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                
                <div class="songname">
                    <h3>Song</h3>
                </div>

                <div class="artist">
                    <h4>Artist</h4>
                </div>
            </div>
            <div class="card">

                <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                
                <div class="songname">
                    <h3>Song</h3>
                </div>

                <div class="artist">
                    <h4>Artist</h4>
                </div>
            </div>
            <div class="card">

                <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                
                <div class="songname">
                    <h3>Song</h3>
                </div>

                <div class="artist">
                    <h4>Artist</h4>
                </div>
            </div>
            <div class="card">

                <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                
                <div class="songname">
                    <h3>Song</h3>
                </div>

                <div class="artist">
                    <h4>Artist</h4>
                </div>
            </div>       
        </div>
        </Caroussel>

        {/* SECOND CAROUSSEL: RECOMMENDATIONS (THIS HAVE TWO INDEPENDENT ROWS! pt:duas linhas!)*/}
        <Caroussel>


            {/* CAROUSSEL FILTER */}
            <h1 class="FilterTitle">Recommended v</h1>



            {/* FIRST ROW */}
            <div class="scrolling-wrapper-flexbox">

                <div class="card">

                    <img class="imagecard" src="https://is5-ssl.mzstatic.com/image/thumb/Music118/v4/1c/d6/5d/1cd65d7a-7f77-1379-ab6d-1bde7dcd7215/8718723091954.jpg/400x400cc.jpg"/>
                    
                    <div class="songname">
                        <h3>Maybe It Was Memphis</h3>
                    </div>

                    <div class="artist">
                        <h4>DJ Windows XP</h4>
                    </div>
                </div>
                
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>        
            </div>



            {/* SECOND ROW */}
            <div class="SecondRow-Recommendations">

            <div class="scrolling-wrapper-flexbox">

                <div class="card">

                    <img class="imagecard" src="https://is5-ssl.mzstatic.com/image/thumb/Music118/v4/1c/d6/5d/1cd65d7a-7f77-1379-ab6d-1bde7dcd7215/8718723091954.jpg/400x400cc.jpg"/>
                    
                    <div class="songname">
                        <h3>Maybe It Was Memphis</h3>
                    </div>

                    <div class="artist">
                        <h4>DJ Windows XP</h4>
                    </div>
                </div>

                
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>
                <div class="card">

                    <img class="imagecard" src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Floral_Shoppe.jpg"/>
                    
                    <div class="songname">
                        <h3>Song</h3>
                    </div>

                    <div class="artist">
                        <h4>Artist</h4>
                    </div>
                </div>        
            </div>
            </div>

        </Caroussel>





        <Genres>
            <div class="genre-scrolling-wrapper-flexbox">

                <div class="genrecard">

                    <img class="genreimagecard" src="https://is5-ssl.mzstatic.com/image/thumb/Music118/v4/1c/d6/5d/1cd65d7a-7f77-1379-ab6d-1bde7dcd7215/8718723091954.jpg/400x400cc.jpg"/>
                    
                    <div class="genrename">
                        <h3>Trap</h3>
                    </div>

                </div>
            </div>
        </Genres>



    </MainContainer>
    
  );
  
  Home.propTypes = {
    darkMode: PropTypes.bool,
  };
  
  Home.defaultProps = {
    darkMode: false,
  };


  
  export default Home;