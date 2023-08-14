import { createRouter, createWebHistory } from "vue-router";
import DashBoard from "../views/DashBoard.vue";
import Employee from "../views/Employee.vue";
import Approver from "../views/Approver.vue";
import Department from "../views/Department.vue";
import Shift from "../views/Shift.vue";
import Overtime from "../views/Overtime.vue";
import Report from "../views/Report.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DashBoard,
    },
    {
      path: "/overtime",
      component: Overtime,
    },
    {
      path: "/overtime/:id",
      component: Overtime,
    },
    {
      path: "/master",
      children: [
        { path: "employee", component: Employee },
        { path: "approver", component: Approver },
        { path: "department", component: Department },
        { path: "shift", component: Shift },
        { path: "report", component: Report },
      ],
    },
  ],
});

export default router;
