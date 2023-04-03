import moment from "moment";


function Review({ text, rating , name , id , date}) {
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    return (
        <div key={id} className="website__review__card">
            <div className="name__time__sec">
                <span className='reviewer_name'>{name}</span>
                <span className='reviewer_time'>{date ? moment(date?.split('T')[0] + ' ' + date?.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</span>
            </div>

            <div className='stars_sec'>
                {stars}
            </div>

            <div className='review_sec'>
                <p>{text}</p>
            </div>


        </div>
    );
}


export default Review