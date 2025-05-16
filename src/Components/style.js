import styled from 'styled-components';

const Wrapper = styled.div`
.container{ 
    height: 100vh;
    width: 100vw;
    overflow-x : hidden; /* Prevent page scroll */
    background-color:lightgreen;
}

  .task-container {
    width: 100%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    background-color:lightseagreen;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
    padding: 24px;
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: auto;
  }

  .headingName {
  color: #2c3e50;
  font-size: 28px;
  font-weight: 500;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
  line-height: 1.4;
  margin-bottom: 24px;
  text-align: center;
}


  .input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
  }

  .task-input {
    flex: 1;
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    transition: border-color 0.2s;
    outline: none;
  }

  .task-input:focus {
    border-color: #4a90e2;
  }

  .add-button {
    background-color: #28a745;
    color: #fff;
    padding: 12px 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .add-button:hover {
    background-color: #218838;
  }

  .task-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .task-item {
    background-color: #f1f3f5;
    color: #222;
    margin-bottom: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .delete-button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }

  .delete-button:hover {
    background-color: #c82333;
  }

  .undo-container {
    margin-top: 16px;
    text-align: center;
  }

  .undo-button {
    background-color: #007bff;
    color: white;
    padding: 8px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }

  .undo-button:hover {
    background-color: #0056b3;
  }

  .toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 14px 22px;
    border-radius: 8px;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 15px;
  }
  .toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 999;
    animation: fadeInOut 3s ease forwards;
    }
.toast.success {
    background-color: #28a745;
    }
.toast.warning {
    background-color: #dc3545;
    }

@keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, 20px); }
    10%, 90% { opacity: 1; transform: translate(-50%, 0); }
    100% { opacity: 0; transform: translate(-50%, 20px); }
    }
`;

export default Wrapper;
