import { AiOutlineUserAdd } from 'react-icons/ai'
import { BsBoxSeam, BsNewspaper, BsReverseLayoutTextWindowReverse, BsChatLeftText, BsFillInboxFill } from 'react-icons/bs'
import { BiDuplicate } from 'react-icons/bi'
import { CgWebsite } from 'react-icons/cg'
import { MdPayments, MdAnnouncement, MdManageAccounts , MdOutlineSpaceDashboard, MdDiscount} from 'react-icons/md'
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
                    <a href='/admin/dashboard'>Dash <MdOutlineSpaceDashboard /></a>
                    <a href='/admin/orders'>Orders <BsBoxSeam /></a>
                    <a href='/admin/websites'>Websites <CgWebsite /></a>
                    <a href='/admin/users'>Users <AiOutlineUserAdd /></a>
                    <a href='/admin/payments'>Payments <MdPayments /></a>
                    <a href='/admin/categories'>Categories <BiDuplicate /></a>
                    <a href='/admin/news-letters'>News <BsNewspaper /></a>
                    <a href='/admin/blogs'>Blogs <BsReverseLayoutTextWindowReverse /></a>
                    <a href='/admin/announcemetns'>Announce <MdAnnouncement /></a>
                    <a href='/admin/founders'>Founders <MdManageAccounts /></a>
                    <a href='/admin/chat'>Live Chat <BsChatLeftText /></a>
                    <a href='/admin/Discounts'>Discounts <MdDiscount /></a>
                    <a href='/admin/contact/messages'>Contact <BsFillInboxFill /></a>
                </div>
            </div>

        </aside>
    )
}

export default SideBar