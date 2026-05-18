from django.shortcuts import render

def home(request):
    # Define which seats are already booked/taken
    taken_seats = [3, 7, 11, 15, 18, 22, 27, 35]
    
    # Generate data for Rows 1 to 8
    rows = []
    for row in range(1, 9):
        is_vip = row <= 2
        section = "VIP Section" if row == 1 else ("Standard Section" if row == 3 else None)
        start_num = (row - 1) * 4
        
        row_data = {
            'number': row,
            'is_vip': is_vip,
            'section': section,
            'seats': {
                'a': {'num': start_num + 1, 'taken': (start_num + 1) in taken_seats},
                'b': {'num': start_num + 2, 'taken': (start_num + 2) in taken_seats},
                'c': {'num': start_num + 3, 'taken': (start_num + 3) in taken_seats},
                'd': {'num': start_num + 4, 'taken': (start_num + 4) in taken_seats},
            }
        }
        rows.append(row_data)
  
    back_row = [{'num': s, 'taken': s in taken_seats} for s in [33, 34, 35, 36, 37]]
    
    context = {
        'rows': rows,
        'back_row': back_row
    }
    return render(request, 'core/index.html', context)

def feedback(request):
    return render(request, 'core/feedback.html')
def account(request):
    return render(request, 'core/account.html')

def login_page(request):
    return render(request, 'core/login.html')

def signup_page(request):
    return render(request, 'core/signup.html')