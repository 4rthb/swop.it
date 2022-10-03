import React, { Component } from 'react'
import filter from '../../images/filter.png'

import './SearchFilter.css'

class SearchFilter extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    
    

    render() {

        const handleChildElementClick = (e) => {
            e.stopPropagation()
            // Do other stuff here
         }

        return(
            <div className="filter-container" >
                <div className="filter-container">
                    <span onClick={ this.handleClick} className="filter-text">Filtro</span>
                    <div onClick={ this.handleClick} className="filter-icon">
                        <img className="filter-icon-image" src={filter} alt="filter icon" />
                    </div>
                </div>


                <div onClick={ this.handleClick} className={this.state.clicked ? 'filter-base filter-active' : 'filter-base filter-inactive'}>
                    < form className='filter-form' action="/">
                        <label onClick={(e) => handleChildElementClick(e)} for="Ordem">Ordenar por:</label>
                        <select onClick={(e) => handleChildElementClick(e)} className='filter-input-container' name="Ordem" id="Ordem">
                            <option value="none" selected>Nenhum</option>
                            <option value="alfabetica">Ordem alfabetica</option>
                            <option value="rating">Avaliação do Produto</option>
                        </select>
                        <br></br>
                        <label onClick={(e) => handleChildElementClick(e)} for="Categoria">Categoria:</label>
                        <select onClick={(e) => handleChildElementClick(e)} className='filter-input-container' name="Categoria" id="Categoria">
                            <option value="none" selected>Todas</option>
                            <option value="alfabetica">Eletrônicos</option>
                            <option value="rating">Automotivos</option>
                            <option value="rating">Variados</option>
                        </select>
                        <br></br>
                        <label onClick={(e) => handleChildElementClick(e)} for="Localizacao">Localização:</label>
                        <input onClick={(e) => handleChildElementClick(e)} className='filter-input-container' type="text" id="Localizacao" name="Localizacao" placeholder='Ex.: Porto Alegre'/>
                        <br></br>
                        <input onClick={(e) => handleChildElementClick(e)} className="filter-submit" type="submit" value="Filtrar"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchFilter