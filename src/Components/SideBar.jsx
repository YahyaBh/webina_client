import React from 'react'
import './SideBar.scss'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        <aside className='sidebar'>
            <div className='side-header'>
                <img src='' alt='logo' className='side-logo' />
            </div>

            <div>
                <ul>
                    <li><Link><AiOutlineUserAdd /></Link></li>
                    <li><Link><AiOutlineUserAdd /></Link></li>
                    <li><Link><AiOutlineUserAdd /></Link></li>
                    <li><Link><AiOutlineUserAdd /></Link></li>
                    <li><Link><AiOutlineUserAdd /></Link></li>
                    <li><Link><AiOutlineUserAdd /></Link></li>
                    <li><Link><AiOutlineUserAdd /></Link></li>
                </ul>
            </div>

        </aside>
    )
}

export default SideBar