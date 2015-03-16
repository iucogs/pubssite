USERS = {'admin': 'admin',
         'user': 'user',
         'viewer': 'viewer'}
GROUPS = {'admin':['group:admin'],
          'user':['group:user']}

def groupfinder(userid, request):
    if userid in USERS:
        return GROUPS.get(userid, [])
