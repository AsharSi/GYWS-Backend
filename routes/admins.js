import express from "express";
import {addMember} from "../Controller/AdminPanel/MemberController/addMember.js";
import {editMember} from "../Controller/AdminPanel/MemberController/editMember.js";
import {deleteMember} from "../Controller/AdminPanel/MemberController/deleteMember.js";
import {searchMember} from "../Controller/AdminPanel/MemberController/searchMember.js"; 
import {getMemberById, getMemberByYearPosTeam,getAllMembers} from "../Controller/AdminPanel/MemberController/getMember.js";
import { register, login } from "../Controller/AdminPanel/AuthControllers.js"
import { ensureAuthenticated, ensureAdmin } from "../Middlewares/AdminPanel/Authorization.js";
import {upload, uploadImage} from "../Middlewares/AdminPanel/Cloudinary.js";
import { addRequest } from "../Controller/AdminPanel/RequestController/addRequest.js";
import { getAllRequests } from "../Controller/AdminPanel/RequestController/getRequest.js";
import { denyRequest } from "../Controller/AdminPanel/RequestController/denyRequest.js";
import { approveRequest } from "../Controller/AdminPanel/RequestController/approveRequest.js";


const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);


router.route("/get/member/:_id").get(getMemberById);
router.get("/get/members",getAllMembers);
router.route("/get/member").get(getMemberByYearPosTeam);
router.route("/search/member/:searchString").get(searchMember);

router.put("/edit/member/:_id",upload.single('image'),uploadImage, editMember);
router.post("/add/member",upload.single('image'),uploadImage,addMember);
router.delete("/delete/member/:_id", deleteMember);

router.post("/add/request",upload.single('image'),uploadImage,addRequest);
router.get("/get/requests",getAllRequests);
router.post("/approve/request/:_id",approveRequest);
router.delete("/deny/request/:_id",denyRequest);

router.use(ensureAuthenticated);
router.use(ensureAdmin);


export default router;

