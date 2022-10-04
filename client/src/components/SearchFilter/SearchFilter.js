import React, { Component,useState } from 'react'
import filter from '../../images/filter.png';
import { useLocation, useNavigate, useParams } from "react-router-dom"

import './SearchFilter.css'

export default function SearchFilter() {
    const [clicked, setClicked] = useState('');
    

    const handleClick = () => {
        setClicked(clicked => !clicked);
    }
    
    const navigate = useNavigate();
    const location = useLocation();

    

    const search = (e) => { //?Ordem=alfabetica&Categoria=alfabetica&Localizacao=
        
        e.preventDefault();
        
        console.log(e);
        let origin = new URL(window.location.href);
        let path = '/';

        let n = origin.href.lastIndexOf('/');
        let result = origin.href.substring(n + 1);

        console.log(result);
        console.log(origin.href);

        path += result;

        if((path.includes("Categoria=")) || (path.includes("Ordem="))) {
            path = '/';
        }

        if(e.target[0].value != 'none')
        {
            if(path != '/')
                path += '&';
            else
                path += '?';

            path += 'Ordem=';
            path += e.target[0].value;
        }
        if(e.target[1].value != 'none' && e.target[1].value != '')
        {
            if(path != '/')
                path += '&';
            else
                path += '?';

            path += 'Categoria=';
            path += e.target[1].value;
        }

        navigate(path);
    };

    const handleChildElementClick = (e) => {
        e.stopPropagation();
        // Do other stuff here
        }

        return(
            <div className="filter-container" >
                <div className="filter-container">
                    <span onClick={ handleClick} className="filter-text">Filtro</span>
                    <div onClick={ handleClick} className="filter-icon">
                        <img className="filter-icon-image" src={filter} alt="filter icon" />
                    </div>
                </div>


                <div onClick={ handleClick} className={clicked ? 'filter-base filter-active' : 'filter-base filter-inactive'}>
                    < form onSubmit={search} className='filter-form' action="/">
                        <label onClick={(e) => handleChildElementClick(e)} for="Ordem">Ordenar por:</label>
                        <select onClick={(e) => handleChildElementClick(e)} className='filter-input-container' name="Ordem" id="Ordem">
                            <option value="none" selected>Nenhum</option>
                            <option value="alfabetica">Ordem alfabetica</option>
                            <option value="rating">Avaliação do Produto</option>
                        </select>
                        <br></br>
                        <label onClick={(e) => handleChildElementClick(e)} for="Categoria">Categoria:</label>
                        <input onClick={(e) => handleChildElementClick(e)} type='text' className='filter-input-container' name="Categoria" id="Categoria"/>
                            {/* <option value="none" selected>Todas</option>
                            <option value="eletronico">Eletrônicos</option>
                            <option value="automotivo">Automotivos</option>
                            <option value="misc">Variados</option>
                        </select> */}
                        <br></br>
                        <input onClick={(e) => handleChildElementClick(e)} className="filter-submit" type="submit" value="Filtrar"/>
                    </form>
                </div>
            </div>
        )
}