import React from 'react'

export default function PreviewCourseTable({ course }) {
    return (
        <table className='text-dark' style={{ width: "90%", margin: "10px 20px" }}>
            <tr>
                <td>عنوان دوره</td>
                <td>{course.title}</td>
            </tr>
            <tr>
                <td>درباره دوره</td>
                <td>{course.content}</td>
            </tr>
            <tr>
                <td>چکیده دوره</td>
                <td>{course.short_description}</td>
            </tr>
            <tr>
                <td>سطح دوره</td>
                <td>{course.level}</td>
            </tr>
            {/* <tr>
                <td>پیش نیاز</td>
                <div>{course.prerequisite.map((preq) => {
                    <div key={preq.id}>{preq.prerequisite_courses.map((prequisity)=>{
                        <div>{prequisity[0]}</div>
                    })}</div>
                })}</div>
            </tr> */}
            <tr>
                <td>تخفیف</td>
                <div>{course.discounts.length == 0 ?
                    0
                    :
                    course.off_percentage
                }
                </div>
            </tr>
            <tr>
                <td>قیمت</td>
                <div>{course.price}</div>
            </tr>
            {/* <tr>
                <td>حالت</td>
                <div>{course.status}</div>
            </tr> */}
            <tr>
                <td>تگ:</td>
                <div>{course.tags.map((tag) => {
                    return <div style={{
                        width: 'fit-content',
                        display: 'inline-block',
                        alignItems: 'center',
                        margin: '5px',
                        padding: ' 5px 15px',
                        borderRadius: '5px',
                        backgroundColor: '#64c5ba',
                    }}>{tag.tag}</div>
                })}</div>
            </tr>
            <tr>
                <td>مدت دوره</td>
                <div>{course.course_duration}</div>
            </tr>
            <tr>
                <td>تعداد ویدیو</td>
                <div>{course.video_count}</div>
            </tr>
            <tr>
                <td>تعداد ویو</td>
                <div>{course.visit_count}</div>
            </tr>

        </table >
    )
}
