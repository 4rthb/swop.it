import React, { Component } from 'react'
import './EditProfile.css'


export default function EditProfile() {
    return(
        <form action="" method="post">
            <div className="container">
                <h1>
                    Editar Perfil
                </h1>
                <div className="EditCard">
                    <div className="data-row">
                        <input placeholder='nome' className='data-input' type="text"/>
                        <input placeholder='email' className='data-input' type="email"/>
                        <input placeholder='cpf' className='data-input' type="text"/>
                        <input placeholder='celular' className='data-input' type="text"/>
                    </div>
                    <div className="data-row">
                        <input placeholder='endereço' className='data-input' type="text"/>
                        <input placeholder='cidade' className='data-input' type="text"/>
                        <input placeholder='cep' className='data-input' type="text"/>
                    </div>
                    <div className="data-row">
                        <input placeholder='senha' className='data-input' type="password"/>
                        <input placeholder='confirmar senha' className='data-input' type='password'/>
                    </div>
                </div>
                <input className='submit-button' type="submit" value="Salvar"/>
            </div>
        </form>
    )
}