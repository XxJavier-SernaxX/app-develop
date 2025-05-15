let page = 1;

function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de Usuarios</h4>';
    
    fetch(`https://reqres.in/api/users?page=${page}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(result => result.json().then(data => ({
        status: result.status,
        body: data
    })))
    .then(response => {
        if (response.status === 200) {
            let listUser = `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
            `;

            response.body.data.forEach(user => {
                listUser += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td><img src="${user.avatar}" alt="Avatar" class="avatar" style="width:50px;height:50px;"></td>
                    <td><button type="button" class="btn btn-dark" onclick="showInfoUser('${user.id}')">View</button></td>
                </tr>
                `;
            });

            listUser += `
                </tbody>
            </table>
            `;
            document.getElementById('info').innerHTML = listUser;

            
            showPagination(response.body.page, response.body.total_pages);
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontraron Usuarios</h3>';
        }
    });
}

function showPagination(currentPage, totalPages) {
    let pagination = `
    <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm">
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
            </li>
    `;
    
    
    for (let i = 1; i <= totalPages; i++) {
        pagination += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }
    
    pagination += `
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
            </li>
        </ul>
    </nav>
    `;
    
    document.getElementById('pagination').innerHTML = pagination;
}


function changePage(newPage) {
    page = newPage;
    getUsers();
}

function showInfoUser(userId) {
    fetch(`https://reqres.in/api/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(result => result.json().then(data => ({
        status: result.status,
        body: data
    })))
    .then(response => {
        if (response.status === 200) {
            showModalUser(response.body.data);
        } else {
            document.getElementById('info').innerHTML = '<h3>Error al cargar información del usuario</h3>';
        }
    });
}

function showModalUser(user) {
    const modalUser = `
        <!-- Modal -->
        <div class="modal fade" id="ModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Información del Usuario</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card mx-auto" style="width: 18rem;">
                            <img src="${user.avatar}" class="card-img-top" alt="Avatar user">
                            <div class="card-body">
                                <h5 class="card-title">User Info</h5>
                                <p class="card-text">First Name: ${user.first_name}</p>
                                <p class="card-text">Last Name: ${user.last_name}</p>
                                <p class="card-text">Email: ${user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('showModal').innerHTML = modalUser;
    
    const modal = new bootstrap.Modal(document.getElementById('ModalUser'));
    modal.show();
}

