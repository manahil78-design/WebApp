import React, { useState } from "react";
import "./App.css";

const students = [
  { rollNo: 1, name: "Ali Khan", class: "10th", marks: 468, percentage: 93.6, grade: "A+" },
  { rollNo: 2, name: "Ayesha Ahmed", class: "10th", marks: 452, percentage: 90.4, grade: "A+" },
  { rollNo: 3, name: "Hamza Malik", class: "10th", marks: 438, percentage: 87.6, grade: "A" },
  { rollNo: 4, name: "Fatima Noor", class: "10th", marks: 475, percentage: 95, grade: "A+" },
  { rollNo: 5, name: "Usman Tariq", class: "10th", marks: 421, percentage: 84.2, grade: "A" },
  { rollNo: 6, name: "Hira Shah", class: "10th", marks: 409, percentage: 81.8, grade: "A" },
  { rollNo: 7, name: "Bilal Ahmed", class: "10th", marks: 395, percentage: 79, grade: "B+" },
  { rollNo: 8, name: "Maham Khan", class: "10th", marks: 447, percentage: 89.4, grade: "A" },
  { rollNo: 9, name: "Zain Ali", class: "10th", marks: 382, percentage: 76.4, grade: "B+" },
  { rollNo: 10, name: "Iqra Malik", class: "10th", marks: 461, percentage: 92.2, grade: "A+" },

  { rollNo: 11, name: "Ahmad Raza", class: "10th", marks: 374, percentage: 74.8, grade: "B" },
  { rollNo: 12, name: "Maryam Khan", class: "10th", marks: 433, percentage: 86.6, grade: "A" },
  { rollNo: 13, name: "Saad Ahmed", class: "10th", marks: 356, percentage: 71.2, grade: "B" },
  { rollNo: 14, name: "Eman Fatima", class: "10th", marks: 418, percentage: 83.6, grade: "A" },
  { rollNo: 15, name: "Hassan Ali", class: "10th", marks: 389, percentage: 77.8, grade: "B+" },
  { rollNo: 16, name: "Laiba Noor", class: "10th", marks: 472, percentage: 94.4, grade: "A+" },
  { rollNo: 17, name: "Danish Khan", class: "10th", marks: 341, percentage: 68.2, grade: "B" },
  { rollNo: 18, name: "Anaya Ahmed", class: "10th", marks: 426, percentage: 85.2, grade: "A" },
  { rollNo: 19, name: "Talha Malik", class: "10th", marks: 365, percentage: 73, grade: "B" },
  { rollNo: 20, name: "Zoya Khan", class: "10th", marks: 449, percentage: 89.8, grade: "A" },

  { rollNo: 21, name: "Abdullah Shah", class: "10th", marks: 398, percentage: 79.6, grade: "B+" },
  { rollNo: 22, name: "Mehwish Ali", class: "10th", marks: 411, percentage: 82.2, grade: "A" },
  { rollNo: 23, name: "Arham Raza", class: "10th", marks: 385, percentage: 77, grade: "B+" },
  { rollNo: 24, name: "Sana Ahmed", class: "10th", marks: 456, percentage: 91.2, grade: "A+" },
  { rollNo: 25, name: "Rayan Khan", class: "10th", marks: 369, percentage: 73.8, grade: "B" },
  { rollNo: 26, name: "Minsa Noor", class: "10th", marks: 432, percentage: 86.4, grade: "A" },
  { rollNo: 27, name: "Waleed Ahmed", class: "10th", marks: 377, percentage: 75.4, grade: "B+" },
  { rollNo: 28, name: "Areeba Khan", class: "10th", marks: 465, percentage: 93, grade: "A+" },
  { rollNo: 29, name: "Shahzaib Malik", class: "10th", marks: 354, percentage: 70.8, grade: "B" },
  { rollNo: 30, name: "Alina Shah", class: "10th", marks: 440, percentage: 88, grade: "A" },

  { rollNo: 31, name: "Muneeb Khan", class: "10th", marks: 402, percentage: 80.4, grade: "A" },
  { rollNo: 32, name: "Sabeen Ahmed", class: "10th", marks: 417, percentage: 83.4, grade: "A" },
  { rollNo: 33, name: "Fahad Ali", class: "10th", marks: 333, percentage: 66.6, grade: "B" },
  { rollNo: 34, name: "Nimra Khan", class: "10th", marks: 448, percentage: 89.6, grade: "A" },
  { rollNo: 35, name: "Rehan Malik", class: "10th", marks: 391, percentage: 78.2, grade: "B+" },
  { rollNo: 36, name: "Hania Noor", class: "10th", marks: 463, percentage: 92.6, grade: "A+" },
  { rollNo: 37, name: "Shayan Ahmed", class: "10th", marks: 358, percentage: 71.6, grade: "B" },
  { rollNo: 38, name: "Maira Khan", class: "10th", marks: 429, percentage: 85.8, grade: "A" },
  { rollNo: 39, name: "Adeel Shah", class: "10th", marks: 347, percentage: 69.4, grade: "B" },
  { rollNo: 40, name: "Esha Ali", class: "10th", marks: 454, percentage: 90.8, grade: "A+" },

  { rollNo: 41, name: "Kashif Khan", class: "10th", marks: 386, percentage: 77.2, grade: "B+" },
  { rollNo: 42, name: "Sadia Ahmed", class: "10th", marks: 423, percentage: 84.6, grade: "A" },
  { rollNo: 43, name: "Moiz Malik", class: "10th", marks: 372, percentage: 74.4, grade: "B" },
  { rollNo: 44, name: "Imaan Khan", class: "10th", marks: 467, percentage: 93.4, grade: "A+" },
  { rollNo: 45, name: "Haris Ali", class: "10th", marks: 405, percentage: 81, grade: "A" },
  { rollNo: 46, name: "Anum Shah", class: "10th", marks: 439, percentage: 87.8, grade: "A" },
  { rollNo: 47, name: "Sameer Ahmed", class: "10th", marks: 362, percentage: 72.4, grade: "B" },
  { rollNo: 48, name: "Aiman Noor", class: "10th", marks: 451, percentage: 90.2, grade: "A+" },
  { rollNo: 49, name: "Yahya Khan", class: "10th", marks: 394, percentage: 78.8, grade: "B+" },
  { rollNo: 50, name: "Komal Fatima", class: "10th", marks: 416, percentage: 83.2, grade: "A" },

  { rollNo: 51, name: "Hammad Ali", class: "10th", marks: 378, percentage: 75.6, grade: "B+" },
  { rollNo: 52, name: "Rabia Khan", class: "10th", marks: 443, percentage: 88.6, grade: "A" },
  { rollNo: 53, name: "Adnan Ahmed", class: "10th", marks: 352, percentage: 70.4, grade: "B" },
  { rollNo: 54, name: "Saira Malik", class: "10th", marks: 425, percentage: 85, grade: "A" },
  { rollNo: 55, name: "Faris Khan", class: "10th", marks: 399, percentage: 79.8, grade: "B+" },
  { rollNo: 56, name: "Mahnoor Ali", class: "10th", marks: 470, percentage: 94, grade: "A+" },
  { rollNo: 57, name: "Saif Ahmed", class: "10th", marks: 367, percentage: 73.4, grade: "B" },
  { rollNo: 58, name: "Ayesha Noor", class: "10th", marks: 435, percentage: 87, grade: "A" },
  { rollNo: 59, name: "Imran Khan", class: "10th", marks: 381, percentage: 76.2, grade: "B+" },
  { rollNo: 60, name: "Hafsa Malik", class: "10th", marks: 458, percentage: 91.6, grade: "A+" },

  { rollNo: 61, name: "Owais Ahmed", class: "10th", marks: 344, percentage: 68.8, grade: "B" },
  { rollNo: 62, name: "Abeer Khan", class: "10th", marks: 410, percentage: 82, grade: "A" },
  { rollNo: 63, name: "Zeeshan Ali", class: "10th", marks: 396, percentage: 79.2, grade: "B+" },
  { rollNo: 64, name: "Minahil Shah", class: "10th", marks: 445, percentage: 89, grade: "A" },
  { rollNo: 65, name: "Asad Malik", class: "10th", marks: 359, percentage: 71.8, grade: "B" },
  { rollNo: 66, name: "Aqsa Ahmed", class: "10th", marks: 431, percentage: 86.2, grade: "A" },
  { rollNo: 67, name: "Rizwan Khan", class: "10th", marks: 388, percentage: 77.6, grade: "B+" },
  { rollNo: 68, name: "Sundas Noor", class: "10th", marks: 462, percentage: 92.4, grade: "A+" },
  { rollNo: 69, name: "Noman Ali", class: "10th", marks: 371, percentage: 74.2, grade: "B" },
  { rollNo: 70, name: "Amna Khan", class: "10th", marks: 419, percentage: 83.8, grade: "A" },

  { rollNo: 71, name: "Farhan Ahmed", class: "10th", marks: 407, percentage: 81.4, grade: "A" },
  { rollNo: 72, name: "Kainat Ali", class: "10th", marks: 450, percentage: 90, grade: "A+" },
  { rollNo: 73, name: "Junaid Khan", class: "10th", marks: 336, percentage: 67.2, grade: "B" },
  { rollNo: 74, name: "Mishal Noor", class: "10th", marks: 424, percentage: 84.8, grade: "A" },
  { rollNo: 75, name: "Abbas Malik", class: "10th", marks: 383, percentage: 76.6, grade: "B+" },
  { rollNo: 76, name: "Eshal Ahmed", class: "10th", marks: 468, percentage: 93.6, grade: "A+" },
  { rollNo: 77, name: "Sami Khan", class: "10th", marks: 397, percentage: 79.4, grade: "B+" },
  { rollNo: 78, name: "Rida Fatima", class: "10th", marks: 437, percentage: 87.4, grade: "A" },
  { rollNo: 79, name: "Arsalan Ali", class: "10th", marks: 361, percentage: 72.2, grade: "B" },
  { rollNo: 80, name: "Nadia Khan", class: "10th", marks: 453, percentage: 90.6, grade: "A+" },

  { rollNo: 81, name: "Murtaza Ahmed", class: "10th", marks: 408, percentage: 81.6, grade: "A" },
  { rollNo: 82, name: "Sehrish Ali", class: "10th", marks: 427, percentage: 85.4, grade: "A" },
  { rollNo: 83, name: "Waqas Khan", class: "10th", marks: 350, percentage: 70, grade: "B" },
  { rollNo: 84, name: "Aleena Shah", class: "10th", marks: 446, percentage: 89.2, grade: "A" },
  { rollNo: 85, name: "Dawood Malik", class: "10th", marks: 376, percentage: 75.2, grade: "B+" },
  { rollNo: 86, name: "Rimsha Ahmed", class: "10th", marks: 434, percentage: 86.8, grade: "A" },
  { rollNo: 87, name: "Ayan Khan", class: "10th", marks: 392, percentage: 78.4, grade: "B+" },
  { rollNo: 88, name: "Bushra Noor", class: "10th", marks: 459, percentage: 91.8, grade: "A+" },
  { rollNo: 89, name: "Kamran Ali", class: "10th", marks: 368, percentage: 73.6, grade: "B" },
  { rollNo: 90, name: "Maham Ahmed", class: "10th", marks: 421, percentage: 84.2, grade: "A" },

  { rollNo: 91, name: "Shehroz Khan", class: "10th", marks: 400, percentage: 80, grade: "A" },
  { rollNo: 92, name: "Arooba Ali", class: "10th", marks: 442, percentage: 88.4, grade: "A" },
  { rollNo: 93, name: "Ibrahim Malik", class: "10th", marks: 357, percentage: 71.4, grade: "B" },
  { rollNo: 94, name: "Saman Khan", class: "10th", marks: 464, percentage: 92.8, grade: "A+" },
  { rollNo: 95, name: "Huzaifa Ahmed", class: "10th", marks: 379, percentage: 75.8, grade: "B+" },
  { rollNo: 96, name: "Ayesha Malik", class: "10th", marks: 430, percentage: 86, grade: "A" },
  { rollNo: 97, name: "Rafay Khan", class: "10th", marks: 346, percentage: 69.2, grade: "B" },
  { rollNo: 98, name: "Saira Noor", class: "10th", marks: 455, percentage: 91, grade: "A+" },
  { rollNo: 99, name: "Shahmeer Ali", class: "10th", marks: 387, percentage: 77.4, grade: "B+" },
  { rollNo: 100, name: "Zunaira Ahmed", class: "10th", marks: 415, percentage: 83, grade: "A" }
];
function App() {
  // How many students to show on one page
  const studentsPerPage = 10;

  // Current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate starting and ending position
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

  // Students for current page
  const currentStudents = students.slice(startIndex, endIndex);

  // Total number of pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  return (
    <div className="app">
      <div className="container">

        {/* Header */}
        <div className="header">
          <div>
            <h1>Student Records</h1>
            <p>Complete student performance overview</p>
          </div>

          <div className="student-count">
            <span>Total Students</span>
            <strong>{students.length}</strong>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrapper">

            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.rollNo}>

                    <td className="roll-number">
                      {student.rollNo}
                    </td>

                    <td className="student-name">
                      {student.name}
                    </td>

                    <td>
                      <span className="class-badge">
                        {student.class}
                      </span>
                    </td>

                    <td>
                      {student.marks}
                    </td>

                    <td>
                      <div className="percentage">
                        <span>{student.percentage}%</span>

                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${student.percentage}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`grade ${
                          student.grade === "A+"
                            ? "grade-Aplus"
                            : student.grade === "A"
                            ? "grade-A"
                            : student.grade === "B+"
                            ? "grade-Bplus"
                            : "grade-B"
                        }`}
                      >
                        {student.grade}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          {/* Pagination */}
          <div className="pagination">

            {/* Previous button */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            {/* Page numbers */}
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={
                    currentPage === index + 1
                      ? "active-page"
                      : ""
                  }
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>

          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          Showing {startIndex + 1}–{Math.min(endIndex, students.length)}{" "}
          of {students.length} students
        </div>

      </div>
    </div>
  );
}

export default App;

