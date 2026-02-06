import pandas as pd

df = pd.read_excel('F:/work/BNI/BNI联系人清单.xlsx')
df.to_csv('F:/work/BNI/temp_output.csv', index=False, encoding='utf-8-sig')
print("Done")
