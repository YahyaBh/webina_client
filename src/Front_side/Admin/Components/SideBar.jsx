import { AiOutlineUserAdd } from 'react-icons/ai'
import { BsMailbox, BsBoxSeam, BsNewspaper, BsReverseLayoutTextWindowReverse, BsChatLeftText, BsFillInboxFill } from 'react-icons/bs'
import { BiDuplicate } from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'
import { MdMiscellaneousServices, MdPayments, MdAnnouncement, MdManageAccounts } from 'react-icons/md'
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

            <div className='sidebar-ul-container'>
                <div>
                    <Link to='/admin/orders'>Orders <BsBoxSeam /></Link>
                    <Link to='/admin/websites'>Websites <CgWebsite /></Link>
                    <Link to='/admin/users'>Users <AiOutlineUserAdd /></Link>
                    <Link to='/admin/payments'>Payments <MdPayments /></Link>
                    <Link to='/admin/categories'>Categories <BiDuplicate /></Link>
                    <Link to='/admin/news-letters'>News <BsNewspaper /></Link>
                    <Link to='/admin/blogs'>Blogs <BsReverseLayoutTextWindowReverse /></Link>
                    <Link to='/admin/announcemetns'>Announce <MdAnnouncement /></Link>
                    <Link to='/admin/founders'>Founders <MdManageAccounts /></Link>
                    <Link to='/admin/chat'>Live Chat <BsChatLeftText /></Link>
                    <Link to='/admin/services'>Services <MdMiscellaneousServices /></Link>
                    <Link to='/admin/contact/messages'>Contact <BsFillInboxFill /></Link>
                </div>
            </div>

        </aside>
    )
}

export default SideBar