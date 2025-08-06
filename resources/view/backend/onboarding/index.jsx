import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { confirmDelete } from '../../../../src/utils/confirmDelete';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Onboarding = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const IMAGE_PATH = import.meta.env.VITE_IMAGE_BASE_URL;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/onboarding/questions`);
      setQuestions(response.data.data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleDelete = (id) => {
	  confirmDelete(`${BASE_URL}/delete/OnboardingQuestion/${id}`, fetchQuestions);
	};

  const indexOfLast = currentPage * questionsPerPage;
  const indexOfFirst = indexOfLast - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
    <div className="card shadow-lg border-0 rounded-2 p-4">
       <div className="d-flex justify-content-between align-items-center mb-3">
  		  <div>
  		    <h2 className="fw-bold mb-1">Onboarding Questions</h2>
  		    <p className="text-muted">List of onboarding form questions</p>
  		  </div>
  		  <Link to="/dashboard/onboarding/create" className="btn bg-brand text-white">
  		  + Create One
  		  </Link>
  		</div>
      <div className="card shadow-sm">
        <div className="card-header bg-brand text-white">
          <h5 className="mb-0">Questions List</h5>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Type</th>
                  <th>Options</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentQuestions.length > 0 ? (
                  currentQuestions.map((question, index) => (
                    <tr key={question.id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{question.question_text}</td>
                      <td>{question.type}</td>
                      <td>
                          {Array.isArray(question.options) && question.options.length > 0 ? (
                            <ul className="mb-0 ps-3 list-none" style={{ listStyleType: 'none' }}>
                              {question.options.map((opt, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  {opt.icon && (
                                    <img
                                      src={`${IMAGE_PATH}/icons/${opt.icon}`}
                                      alt={opt.name}
                                      style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                                    />
                                  )}
                                  <span>{opt.name}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            'N/A'
                          )}
                        </td>


                      <td>
                        {/*<button className="btn btn-sm btn-outline-primary me-2" onClick={() => alert(`Viewing question ID: ${question.id}`)}>
                          <FaEye />
                        </button>*/}
                        <Link
            						  to={`/dashboard/onboarding/edit/${question.id}`}
            						  className="btn btn-sm btn-outline-success me-2"
            						>
            						  <FaEdit />
            						</Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(question.id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-3">No questions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-top d-flex justify-content-between align-items-center">
            <span>
              Showing {indexOfFirst + 1} to {Math.min(indexOfLast, questions.length)} of {questions.length} entries
            </span>
            <ul className="pagination mb-0">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Onboarding;
