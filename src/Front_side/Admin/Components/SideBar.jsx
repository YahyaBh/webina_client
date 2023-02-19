import { AiOutlineUserAdd } from 'react-icons/ai'
import { BsMailbox } from 'react-icons/bs'
import { CgWebsite } from 'react-icons/cg'
import { MdMiscellaneousServices } from 'react-icons/md'
import { AiOutlineMessage } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Logo from '../../../Assets/Images/WEBINA2.png'


const SideBar = () => {
    return (
        <aside className='sidebar'>
            <div className='side-header'>
                <img src={Logo} alt='logo' className='side-logo' />
                <a href='/logout'>LOGOUT</a>
            </div>

            <div>
                <ul>
                    <li><Link to='/admin/websites'><CgWebsite /></Link></li>
                    <li><Link to='/admin/services'><MdMiscellaneousServices /></Link></li>
                    <li><Link to='/admin/users'><AiOutlineUserAdd /></Link></li>
                    <li><Link to='/admin/orders'><BsMailbox /></Link></li>
                    <li><Link to='/admin/chat'><AiOutlineMessage /></Link></li>

                </ul>
            </div>

        </aside>
    )
}

export default SideBar