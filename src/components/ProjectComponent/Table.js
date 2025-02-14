import { Table, Icon, Popconfirm, message, Input, Button, Pagination } from "antd";
import Highlighter from "react-highlight-words";
import React from "react";
import EditModel from "./EditModel";
import axios from "axios";

function confirm(e) {
  console.log(e)
  message.success("Delete Successfully!");
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);

  }
  state = {
    searchText: "",
    projects: [],
    projectId: this.props.projectId,
    projectName: this.props.projectName,
    duration: this.props.duration,
    status: this.props.status,
    startDate: this.props.startDate,
    endDate: this.props.endDate,
    type: this.props.type
  };


  handleSubmit = event => {
    console.log(this.state.handleSubmit);
    event.preventDefault();
  };
  showEditModal = () => {
    console.log("showEditModal");
    this.setState({
      visibleEditModal: true,
    });
  }
  componentDidMount() {
    // page refresh
    this.getAllProjects();
  }
  //DELETE-METHOD 1 = WORKING
  handleDelete = projectId => {
    axios.delete(`http://localhost:8081/defectservices/deleteById/` + projectId)
      .then(console.log(projectId))
      .catch(err => console.log(err));

    const projects = this.state.projects.filter(projects => {
      return projects.projectId !== projectId;
    });
    this.setState({
      projects
    });
    message.success("Delete Successfully");
  };


  getAllProjects() {
    const obj = {
      projectName: this.state.projectName,
      duration: this.state.duration,
      status: this.state.status,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      type: this.state.type


    }
    axios
      .get(`http://localhost:8081/defectservices/GetAllproject`)
      .then(res => {
        //const projects = res.data;
        this.setState({ projects: res.data });

        console.log(this.state.projects);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            id="searchKey"
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            id="search"
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
        </Button>
          <Button
            id="reset"
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
        </Button>
        </div>
      ),

    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };


  render() {
    const columns = [
      {
        title: "Project Id ",
        dataIndex: "projectId",
        key: "projectid",
        width: "20%",
        ...this.getColumnSearchProps("projectId")
      },
      {
        title: "Project Name",
        dataIndex: "projectName",
        key: "projectName",
        width: "20%",
        ...this.getColumnSearchProps("projectName")
      },
      {
        title: "Type ",
        dataIndex: "type",
        key: "type",
        width: "20%",
        ...this.getColumnSearchProps("type")
      },

      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
        width: "20%",
        ...this.getColumnSearchProps("startDate")
      },

      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
        width: "20%"
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        width: "20%",
      },

      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "20%",
        ...this.getColumnSearchProps("status")
      },


      {
        title: "Edit ",
        dataIndex: "edit",
        key: "edit",
        width: "10%",
        render: (text, data = this.state.patients) => (
          <span>
            <a>
              <EditModel id="editProject" projectProps={data.projectId} />
            </a>
          </span>
        )
      },
      {
        title: "Delete ",
        dataIndex: "delete",
        key: "delete",
        width: "10%",
        render: (text, data = this.state.patients) => (
          <span>
            <Popconfirm
              id="confirmdeleteProject"
              title="Are you sure delete this task?"
              onConfirm={this.handleDelete.bind(this, data.projectId)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">
                <Icon
                  id="deleteProject"
                  type="delete"
                  style={{
                    color: "red",
                    fontSize: "18px"
                  }}
                />
              </a>
            </Popconfirm>
          </span>
        )
      }
    ];

    return <Table id="countData" columns={columns} dataSource={this.state.projects} pagination={{
      total: this.state.Total,
      showTotal: (total, range) =>
        `${range[0]}-${range[1]} of ${total} items`,
      pageSize: 10,
      showSizeChanger: true
      // showQuickJumper: true
    }} />;
  }
}
// ReactDOM.render(<Pagination defaultCurrent={1} total={50} />, document.getElementById('container'));