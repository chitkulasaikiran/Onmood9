export class ApiUrls {
    private static IS_PRODUCTION = false;
    public static UI_WEBSITE_URL = "http://localhost:4200/#/";
    private static TESTING_SERVER = "https://onmood9.com/qa/server/";
    private static PRODUCTION_SERVER = "https://onmood9.com/server/";
    // private static WEBSITE_URL = "http://localhost/meditation_server/";
    private static WEBSITE_URL = ApiUrls.IS_PRODUCTION ? ApiUrls.PRODUCTION_SERVER : ApiUrls.TESTING_SERVER; //"http://localhost/meditation_server/";
    public static ONMOOD9_IMAGES_PATH = ApiUrls.WEBSITE_URL + "assets/media/";
    public static ONMOOD9_BG_MUSIC_PATH = ApiUrls.WEBSITE_URL + "uploads/meditation/";
    public static ONMOOD9_COURSE_IMAGES_PATH = ApiUrls.WEBSITE_URL + "uploads/courses/";
    public static ONMOOD9_SESSION_FILE_PATH = ApiUrls.WEBSITE_URL + "uploads/courses/audio/";

    
    private static BASE_URL = ApiUrls.WEBSITE_URL + "index.php/api/";
	public static BLOG_IMAGES_PATH = ApiUrls.WEBSITE_URL + "uploads/blogs/";
    public static COURSE_MUSIC_IMAGES_PATH = ApiUrls.WEBSITE_URL + "uploads/course-music/";

    public static COURSES_PATH = ApiUrls.WEBSITE_URL + "uploads/courses/";
    
    
    public static LEARN_ID = 1;
    public static MEDITATE_ID = 2;
    public static RELAX_ID = 3;
    public static MEDITATION_SERIES_ID = ApiUrls.IS_PRODUCTION ? 32 : 28; //28;//Testing
    public static MEDITATION_SINGLE_ID = ApiUrls.IS_PRODUCTION ? 28 : 31; //31;//Testing
    public static RELAX_MUSIC_ID = ApiUrls.IS_PRODUCTION ? 29 : 29;//Testing

    public static HOME_PAGE_ID = 1;

    public static MEDITATION_SERIES_HOME_PAGE_IMAGE_WIDTH = 150;
    public static MEDITATION_SERIES_HOME_PAGE_IMAGE_HEIGHT = 100;
    public static MEDITATION_SERIES_HOME_PAGE_CAROSAL_HEIGHT = 150;



    
    // onmood9@gmail.com
    public static FACEBOOK_APP_ID = "3014469375503164";//" 1340340410072041";
    // rajanikanthchintakayala@gmail.com 
    // public static FACEBOOK_APP_ID = "3161510020628470";//"202020561128064";
    public static FACEBOOK_SDK_URL = "https://connect.facebook.net/en_US/sdk.js";
    // public static FACEBOOK_USER_DETAILS_URL = "https://graph.facebook.com/{fb-user-id}?fields=name,email,birthday&access_token={access-token}"
    public static FACEBOOK_USER_DETAILS_URL = "https://graph.facebook.com/{fb-user-id}?fields=name,email&access_token={access-token}"
    
    // public static GOOGLE_APP_ID = "376812513328-8ci6lq9qfj1over3d2h0qo3shtt2ot4h.apps.googleusercontent.com";
    // public static GOOGLE_APP_SECRET_ID = "a71olEeLQsN89xJPMam-CE4L";



    // onmood9@gmail.com 
    public static ONMOOD9_GOOGLE_APP_ID = "3302985111021-pjfe2cnk0f6oohntnqhfr3sbpnuea73m.apps.googleusercontent.com";
    public static ONMOOD9_GOOGLE_APP_SECRET_ID = "vQwDFqvoL3seEQHVngC5j0D-";


    // onmood9@gmail.com -  webclient-3
    // public static ONMOOD9_GOOGLE_APP_ID = "302985111021-shcbnnbbbn4cl24gavfr2a5rldl4499m.apps.googleusercontent.com";
    // public static ONMOOD9_GOOGLE_APP_SECRET_ID = "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";
    
    


    // public static ONMOOD9_GOOGLE_APP_ID = "302985111021-op2ecaoemenslhvi19loberantsdhhol.apps.googleusercontent.com";
    // public static ONMOOD9_GOOGLE_APP_SECRET_ID = "tQtRo5utnkzhqwP_a-xb64bl";

    public static COURCE_TYPES_URL = ApiUrls.BASE_URL + "CourseTypes";
    public static COURCE_TYPE_DETAILS_URL = ApiUrls.BASE_URL + "CourseTypes/{id}";
    public static CREATE_COURCE_TYPE_URL = ApiUrls.BASE_URL + "CourseTypes";
    public static UPDATE_COURCE_TYPE_URL = ApiUrls.BASE_URL + "CourseTypes";
    public static DELETE_COURCE_TYPE_YRL = ApiUrls.BASE_URL + "CourseTypes/{id}";

    


    public static ONMOOD_COURSE_TYPES_URL = ApiUrls.BASE_URL + "OnmoodCourseTypes";
    public static ONMOOD_COURSE_TYPE_DETAILS_URL = ApiUrls.BASE_URL + "OnmoodCourseTypes/{id}";
    public static CREATE_ONMOOD_COURSE_TYPE_URL = ApiUrls.BASE_URL + "OnmoodCourseTypes";
    public static UPDATE_ONMOOD_COURSE_TYPE_URL = ApiUrls.BASE_URL + "OnmoodCourseTypes";
    public static DELETE_ONMOOD_COURSE_TYPE_YRL = ApiUrls.BASE_URL + "OnmoodCourseTypes/{id}";

    public static GET_CATEGORIES_URL = ApiUrls.BASE_URL + "Categories";
    public static GET_CATEGORY_DETAILS_URL = ApiUrls.BASE_URL + "Categories/{id}";
    public static CREATE_CATEGORY_URL = ApiUrls.BASE_URL + "Categories";
    public static UPDATE_CATEGORY_URL = ApiUrls.BASE_URL + "Categories";
    public static DELETE_CATEGORY_URL = ApiUrls.BASE_URL + "Categories/{id}";
    public static GET_CATEGORIES_WITH_GROUP_COUNT1_URL  = ApiUrls.BASE_URL + "Categories/getCategoriesWithGroupCount1/{id}";
    public static GET_CATEGORIES_BY_TYPE_URL  = ApiUrls.BASE_URL + "Categories/getCategoriesByCategoryTypeId/{id}";
    
    public static UPDATE_CATEGORY_ACTIVE_MODULE_URL = ApiUrls.BASE_URL + "Categories/updateActiveModule";
    public static GET_RELAX_MODULES_BY_RELAX_ID_URL  = ApiUrls.BASE_URL + "CategoryGroupModule/getRelaxModules";
    public static GET_MEDITATE_MODULES_BY_RELAX_ID_URL  = ApiUrls.BASE_URL + "CategoryGroupModule/getMeditateModules";
    public static GET_FEATURED_MODULES_URL  = ApiUrls.BASE_URL + "CategoryGroupModule/getFeaturedModules";
    



    public static GET_CATEGORY_GROUP_URL = ApiUrls.BASE_URL + "CategoryGroup";
    public static GET_CATEGORY_GROUP_DETAILS_URL = ApiUrls.BASE_URL + "CategoryGroup/{id}";
    public static CREATE_CATEGORY_GROUP_URL = ApiUrls.BASE_URL + "CategoryGroup";
    public static UPDATE_CATEGORY_GROUP_URL = ApiUrls.BASE_URL + "CategoryGroup/updateCategoryGroup";
    public static DELETE_CATEGORY_GROUP_URL = ApiUrls.BASE_URL + "CategoryGroup/{id}";
    public static GET_CATEGORY_GROUPS_BY_CATEGORY_URL  = ApiUrls.BASE_URL + "CategoryGroup/getGroupsByCategoryId/{id}";
    public static GET_CATEGORY_GROUPS_WITH_MODULE_COUNT_URL  = ApiUrls.BASE_URL + "CategoryGroup/getGroupsWithModuleCount/{id}";
    public static GET_CATEGORY_GROUPS_WITH_MODULES_URL  = ApiUrls.BASE_URL + "CategoryGroup/getGroupsWithModules/{id}";
    

    /*-------------Course group modules---------------*/ 
    public static GET_CATEGORY_GROUP_MODULES_URL = ApiUrls.BASE_URL + "CategoryGroupModule";
    public static GET_CATEGORY_GROUP_MODULE_DETAILS_URL = ApiUrls.BASE_URL + "CategoryGroupModule/{id}";
    public static CREATE_CATEGORY_GROUP_MODULE_URL = ApiUrls.BASE_URL + "CategoryGroupModule";
    public static UPDATE_CATEGORY_GROUP_MODULE_URL = ApiUrls.BASE_URL + "CategoryGroupModule/updateCategoryGroupModule";
    public static DELETE_CATEGORY_GROUP_MODULE_URL = ApiUrls.BASE_URL + "CategoryGroupModule/{id}";
    public static GET_CATEGORY_GROUP_MODULES_BY_GROUP_ID_URL  = ApiUrls.BASE_URL + "CategoryGroupModule/getModulesByGroupId/{id}";
    public static GET_CATEGORY_GROUP_MODULES_WITH_SESSION_COUNT_URL  = ApiUrls.BASE_URL + "CategoryGroupModule/getModulesWithSessionCount/{id}";
    public static CREATE_CATEGORY_GROUP_MODULE_VIDEO_URL = ApiUrls.BASE_URL + "CategoryGroupModule/addModuleVideo";
    public static GET_CATEGORY_GROUP_MODULE_VIDEOS_URL = ApiUrls.BASE_URL + "CategoryGroupModule/getModuleVideos/{module_id}";
    public static GET_CATEGORY_GROUP_MODULE_AVAILABLE_VIDEOS_URL = ApiUrls.BASE_URL + "CategoryGroupModule/getModuleAvailableVideos/{module_id}";
    public static DELETE_CATEGORY_GROUP_MODULE_VIDEO_URL = ApiUrls.BASE_URL + "CategoryGroupModule/deleteModuleVideo/{video_id}";
    public static GET_TOP_VISIT_MODULES_URL = ApiUrls.BASE_URL + "CategoryGroupModule/getTopVisitModules/{category_id}";
    public static GET_MEDITATION_MODULES_BY_SERIES_ID_URL  = ApiUrls.BASE_URL + "CategoryGroupModule/getMeditationModulesBySeriesId";
    



    /*-------------Course group module sessions---------------*/
    public static GET_CATEGORY_GROUP_MODULE_SESSIONS_URL = ApiUrls.BASE_URL + "CategoryGroupModuleSession";
    public static GET_CATEGORY_GROUP_MODULE_SESSION_DETAILS_URL = ApiUrls.BASE_URL + "CategoryGroupModuleSession/{id}";
    public static CREATE_CATEGORY_GROUP_MODULE_SESSION_URL = ApiUrls.BASE_URL + "CategoryGroupModuleSession";
    public static UPDATE_CATEGORY_GROUP_MODULE_SESSION_URL = ApiUrls.BASE_URL + "CategoryGroupModuleSession/updateCategoryGroupModuleSession";
    public static DELETE_CATEGORY_GROUP_MODULE_SESSION_URL = ApiUrls.BASE_URL + "CategoryGroupModuleSession/{id}";
    public static GET_CATEGORY_GROUP_MODULE_SESSIONS_BY_MODULE_ID_URL  = ApiUrls.BASE_URL + "CategoryGroupModuleSession/getSessionsByModuleId/{id}";




























    public static GET_ONMOOD9_MOODS_URL = ApiUrls.BASE_URL + "Onmood9Moods/getMoods";
    public static GET_ONMOOD9_MOOD_DETAILS_URL = ApiUrls.BASE_URL + "Onmood9Moods/{id}";
    public static CREATE_ONMOOD9_MOOD_URL = ApiUrls.BASE_URL + "Onmood9Moods";
    public static UPDATE_ONMOOD9_MOOD_URL = ApiUrls.BASE_URL + "Onmood9Moods";
    public static DELETE_ONMOOD9_MOOD_URL = ApiUrls.BASE_URL + "Onmood9Moods/{id}";

    public static GET_COURCES_URL = ApiUrls.BASE_URL + "Courses";
    public static GET_COURCE_DETAILS_URL = ApiUrls.BASE_URL + "Courses/{id}";
    public static CREATE_COURCE_URL = ApiUrls.BASE_URL + "Courses";
    public static UPDATE_COURCE_URL = ApiUrls.BASE_URL + "Courses";
    public static DELETE_COURCE_URL = ApiUrls.BASE_URL + "Courses/{id}";

    public static GET_ALL_MODULES_URL = ApiUrls.BASE_URL + "CourseModules";
    public static GET_COURCE_MODULES_URL = ApiUrls.BASE_URL + "CourseModules/course/{courseId}";
    public static GET_COURCE_MODULE_DETAILS_URL = ApiUrls.BASE_URL + "CourseModules/{id}";
    public static CREATE_COURCE_MODULE_URL = ApiUrls.BASE_URL + "CourseModules";
    public static UPDATE_COURCE_MODULE_URL = ApiUrls.BASE_URL + "CourseModules";
    public static DELETE_COURCE_MODULE_URL = ApiUrls.BASE_URL + "CourseModules/{id}";

    public static GET_MODULE_SESSIONS_URL = ApiUrls.BASE_URL + "ModuleSessions";
    public static GET_MODULE_SESSION_DETAILS_URL = ApiUrls.BASE_URL + "ModuleSessions/{id}";
    public static CREATE_MODULE_SESSION_URL = ApiUrls.BASE_URL + "ModuleSessions";
    public static UPDATE_MODULE_SESSION_URL = ApiUrls.BASE_URL + "ModuleSessions";
    public static DELETE_MODULE_SESSION_URL = ApiUrls.BASE_URL + "ModuleSessions/{id}";
    public static GET_VISITED_MODULES = ApiUrls.BASE_URL + "OnmoodUsers/getUserVisitedModules/";
    public static GET_VISITED_CATEGORIES = ApiUrls.BASE_URL + "OnmoodUsers/getUserVisitedCategories/";
    public static GET_PLAYED_SESSION_DATE_RANGE = ApiUrls.BASE_URL + "OnmoodUsers/getUserPlayedSessionsWithDateRange";
    public static GET_ALL_CAT_PLAYED_SESSION_DATE_RANGE = ApiUrls.BASE_URL + "OnmoodUsers/getUserPlayedSessionsWithDateRangeInAllCategories";
    



    public static GET_BLOGS_URL = ApiUrls.BASE_URL + "Blogs";
    public static GET_ACTIVE_BLOGS_URL = ApiUrls.BASE_URL + "Blogs/activeBlogs";
	public static GET_NEXT_ACTIVE_BLOGS_URL = ApiUrls.BASE_URL + "Blogs/nextActiveBlogs/{publish_date}";

    public static GET_CATEGORY_BLOGS_URL = ApiUrls.BASE_URL + "Blogs/categoryBlogs/{id}";
    public static GET_VIDEO_BLOGS_URL = ApiUrls.BASE_URL + "Blogs/videoBlogs";
    public static GET_TEXTUAL_BLOGS_URL = ApiUrls.BASE_URL + "Blogs/textualBlogs";
    public static GET_SEARCH_BLOGS_URL = ApiUrls.BASE_URL + "Blogs/searchBlogs";
    public static GET_TAG_BASED_BLOGS_URL = ApiUrls.BASE_URL + "Blogs/tagBasedBlogs";
    public static GET_BLOG_DETAILS_URL = ApiUrls.BASE_URL + "Blogs/{id}";
    public static CREATE_BLOG_URL = ApiUrls.BASE_URL + "Blogs";
    public static UPDATE_BLOG_URL = ApiUrls.BASE_URL + "Blogs";
    public static DELETE_BLOG_URL = ApiUrls.BASE_URL + "Blogs/{id}";
    public static UPDATE_BLOG_COUNT_URL = ApiUrls.BASE_URL + "Blogs/updateViewCount";
    public static GET_MOST_VIEWED_ACTIVE_BLOGS_URL = ApiUrls.BASE_URL + "Blogs/mostViewActiveBlogs";

    public static GET_PAGE_META_URL = ApiUrls.BASE_URL + "PageMeta";
    public static GET_PAGE_META_DETAILS_URL = ApiUrls.BASE_URL + "PageMeta/getPageMetaByName/{name}";
    public static CREATE_PAGE_META_URL = ApiUrls.BASE_URL + "PageMeta";
    public static UPDATE_PAGE_META_URL = ApiUrls.BASE_URL + "PageMeta/updatePageMeta";
    public static DELETE_PAGE_META_URL = ApiUrls.BASE_URL + "PageMeta/{id}";

    public static GET_BACKGROUND_MUSICS_URL = ApiUrls.BASE_URL + "BgMusic";
    public static GET_ACTIVE_BACKGROUND_MUSICS_URL = ApiUrls.BASE_URL + "BgMusic/getActive";
    public static GET_AVAILABLE_BACKGROUND_MUSICS_URL = ApiUrls.BASE_URL + "BgMusic/getAvailableMusicsForCourse";
    public static CREATE_BACKGROUND_MUSIC_URL = ApiUrls.BASE_URL + "BgMusic";
    public static UPDATE_BACKGROUND_MUSIC_URL = ApiUrls.BASE_URL + "BgMusic";
    public static DELETE_BACKGROUND_MUSIC_URL = ApiUrls.BASE_URL + "BgMusic/{id}";
    public static UPDATE_BACKGROUND_MUSIC_STATUS_URL = ApiUrls.BASE_URL + "BgMusic/updateStatus";

    public static GET_MUSIC_SINGLES_URL = ApiUrls.BASE_URL + "CourseMusicSingle";
    public static GET_ACTIVE_MUSIC_SINGLES_URL = ApiUrls.BASE_URL + "CourseMusicSingle/getActive";
    public static CREATE_MUSIC_SINGLE_URL = ApiUrls.BASE_URL + "CourseMusicSingle";
    public static UPDATE_MUSIC_SINGLE_URL = ApiUrls.BASE_URL + "CourseMusicSingle";
    public static DELETE_MUSIC_SINGLE_URL = ApiUrls.BASE_URL + "CourseMusicSingle/{id}";
    public static UPDATE_MUSIC_SINGLE_STATUS_URL = ApiUrls.BASE_URL + "CourseMusicSingle/updateStatus";

    public static GET_LIBRARY_VIDEOS_URL = ApiUrls.BASE_URL + "OnmoodLibrary/getVideos";
    public static GET_LIBRARY_VIDEO_URL = ApiUrls.BASE_URL + "OnmoodLibrary/getVideo/{id}";
    
    // v=spf1 +a +mx +ip4:162.144.47.85 ~all;google-site-verification=Yk-3IIXTFJNpG2mnDcWQozEmsVDlsCQY52ykk3h0__E
    


    public static CREATE_CATEGORY_GROUP_MODULE_SESSION_FILE_URL  = ApiUrls.BASE_URL + "CategoryGroupModuleSessionFile";
    public static GET_CATEGORY_GROUP_MODULE_SESSION_FILES_BY_SESSION_ID_URL  = ApiUrls.BASE_URL + "CategoryGroupModuleSessionFile/getFilesBySessionId/{id}";
    public static GET_CATEGORY_GROUP_MODULE_MALE_VOICE_SESSION_FILES_BY_SESSION_ID_URL  = ApiUrls.BASE_URL + "CategoryGroupModuleSessionFile/getMaleVoiceFilesBySessionId/{id}";
    public static GET_CATEGORY_GROUP_MODULE_FEMALE_VOICE_SESSION_FILES_BY_SESSION_ID_URL  = ApiUrls.BASE_URL + "CategoryGroupModuleSessionFile/getFemaleVoiceFilesBySessionId/{id}";
    public static GET_CATEGORY_GROUP_MODULE_AUDIO_SESSION_FILES_BY_SESSION_ID_URL  = ApiUrls.BASE_URL + "CategoryGroupModuleSessionFile/getAudioFilesBySessionId/{id}";
    
    
    public static DELETE_CATEGORY_GROUP_MODULE_SESSION_FILE_URL  = ApiUrls.BASE_URL + "CategoryGroupModuleSessionFile/removeFile";



    public static SAVE_SOCIAL_MEDIA_USER_URL =     ApiUrls.BASE_URL + "OnmoodSocialUser/addSocialMediaUser";

    public static USER_LOGIN_URL =                  ApiUrls.BASE_URL + "OnmoodUsersLogin/login";
    public static SET_USER_PASSWORD_URL =           ApiUrls.BASE_URL + "OnmoodUsersLogin/setUserPassword";
    public static NEW_USER_SIGN_UP =                ApiUrls.BASE_URL + "OnmoodUsersLogin/user";



    public static GET_USERS_URL =                   ApiUrls.BASE_URL + "OnmoodUsers";
    public static LOGIN_USER =                      ApiUrls.BASE_URL + "OnmoodUsers/login";
    // public static NEW_USER_SIGN_UP =                ApiUrls.BASE_URL + "OnmoodUsers/user";
    public static SOCIAL_USER_SIGN_UP =             ApiUrls.BASE_URL + "OnmoodUsers/social_user";
    public static CHECK_USER_EXIST_URL =            ApiUrls.BASE_URL + "OnmoodUsers/check_user_exist";
    public static CHECK_SOCIAL_USER_EXIST_URL =     ApiUrls.BASE_URL + "OnmoodUsers/check_social_user_exist";
    public static SAVE_SOCIAL_USER_URL =            ApiUrls.BASE_URL + "OnmoodUsers/save_social_user";
    public static UPDATE_SOCIAL_USER_PASSWORD_URL = ApiUrls.BASE_URL + "OnmoodUsers/update_social_user_password";
    public static GET_USER_PLAYED_SESSIONS_URL =    ApiUrls.BASE_URL + "OnmoodUsers/get_user_played_sessions/{userId}";
    public static SAVE_USER_PLAYED_SESSION_URL =    ApiUrls.BASE_URL + "OnmoodUsers/saveUserPlayedSession";
    public static CHANGE_USER_PASSWORD_URL =                ApiUrls.BASE_URL + "OnmoodUsers/changeUserPassword";
    
    
    
    public static RESET_USER_PASSWORD_URL =         ApiUrls.BASE_URL + "OnmoodUsers/updateUserPassword";
    public static UPDATE_USER_PERSONAL_INFO_URL =   ApiUrls.BASE_URL + "OnmoodUsers/updatePersonalInfo";

    
    public static GET_USER_NOTIFICATIONS_URL =   ApiUrls.BASE_URL + "UserNotification/getUserNotifications/{userId}";
    

    public static PASSWORD_RESET_CODE_URL =         ApiUrls.BASE_URL + "UserPasswordReset/save_key_code";
    public static VERIFY_RESET_CODE_URL =           ApiUrls.BASE_URL + "UserPasswordReset/verify_key_code";
    public static IS_RESET_CODE_VERIFIED_URL =      ApiUrls.BASE_URL + "UserPasswordReset/is_reset_code_verified";

    public static VERIFY_USER_ACCOUNT_URL =      ApiUrls.BASE_URL + "UserPasswordReset/is_account_reset_code_verified";


    public static GET_IMAGE_PAGES_URL = ApiUrls.BASE_URL + "ImageController/getPagesForImages";
    public static GET_HOME_PAGE_DIMENSIONS_URL = ApiUrls.BASE_URL + "ImageController/getImagesByPageId";
    
    public static GET_ATTENDED_ASSESSMENTS_BY_ASSESSMENT = ApiUrls.BASE_URL + "v2/ui/UAssessment/getUserAttemptedAssessmentsByAssessmentId/";
    public static GET_ALL_ASSESSMENTS =  ApiUrls.BASE_URL + "v2/ui/UAssessment/getAllAssessments/"
    public static POST_ASSESSMENT_TEST =  ApiUrls.BASE_URL + "v2/ui/UAssessmentTrack/save_assessment_with_options"
    public static POST_MOODS =  ApiUrls.BASE_URL + "UserMoodTracker/saveUserMood"
    public static GET_MOODS =  ApiUrls.BASE_URL + "UserMoodTracker/getUserMoodTrackerData";
    public static GET_THOUGHTS =  ApiUrls.BASE_URL + "UserMoodTracker/getUserThoughtTrackerData";
    public static POST_USER_MOODS_DATA = ApiUrls.BASE_URL + "UserMoodTracker/getUserMoodTrackerData"
    public static SECURITY_API_TEST_URL =         ApiUrls.BASE_URL + "TestController";


    public static GET_USER_SUBSCRIPTIONS_URL =   ApiUrls.BASE_URL + "UserSubscriptions/get_user_subscriptions/";
    public static GET_CORP_SUBSCRIPTIONS_URL =   ApiUrls.BASE_URL + "UserSubscriptions/get_corporate_active_subscription/";


}

